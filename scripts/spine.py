#!/usr/bin/env python3
"""Replay every spine step and compare its terminal transcript with what the code really prints.

The spine is the course's one project, `roastery-etl`, kept as real files: one snapshot per step in
spine/<course>/<step>/project/. Each step's session.txt is the terminal pane a scene shows — `$ `
lines are commands, everything else is their output. Scenes import these files with Vite's `?raw`,
so a frame can only show what this script has verified.

  python3 scripts/spine.py            check every step (exit 1 on any difference)
  python3 scripts/spine.py --write    re-run every step and rewrite its session.txt / captures
  python3 scripts/spine.py hold/03    only the steps whose path starts with an argument

Each step is replayed in a fresh temp copy named roastery-etl, inside a temp "home" directory, by
ONE bash process, so `cd` and `source .venv/bin/activate` carry from command to command as they do
in a real terminal. A `$ python` command followed by `>>> ` lines is a REPL session: it is run in a
pseudo-terminal and fed those lines. Temp paths are rewritten to /home/ana/roastery-etl, the path the
frames show. Run it with the course's pinned interpreter first on PATH as `python` (see CLAUDE.md).

step.json (all keys optional):
  {"start": "home"}             start in the directory ABOVE the project (default: the project)
  {"venv": true}                create .venv before replaying and start with it activated
  {"capture": ["path", ...]}    files the session creates that a scene shows; saved to captured/
  {"project": "name"}           the folder's name (default roastery-etl): Course 1-2 demos are not the spine
  {"volatile": true}            output carries ids or timings that change every run: compared with every
                                digit masked, so the text and shape are checked but not the numbers
"""
import json
import os
import pty
import re
import select
import shlex
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / 'spine'
SHOWN_HOME = '/home/ana'
PROJECT = 'roastery-etl'
ANSI = re.compile(r'\x1b\[[0-9;?]*[@-~]|\x1b[=>]|\r')
MARK = '__SPINE_MARK__'


def commands(session: str) -> list[tuple[str, list[str]]]:
    """Split a transcript into (command, REPL input lines) pairs."""
    out: list[tuple[str, list[str]]] = []
    for line in session.splitlines():
        if line.startswith('$ '):
            out.append((line[2:], []))
        elif out and (line.startswith('>>> ') or line == '>>>' or line.startswith('... ')):
            out[-1][1].append(line[4:])
    return out


def repl(cwd: Path, env: dict, inputs: list[str], argv: list[str]) -> str:
    """Run the REPL command (`python`, `python -q`) in a pty, type each input line, return the screen."""
    pid, fd = pty.fork()
    if pid == 0:
        os.chdir(cwd)
        os.execvpe(argv[0], argv, {**env, 'TERM': 'xterm-256color'})
    screen = b''

    def drain(timeout: float) -> None:
        nonlocal screen
        end = time.time() + timeout
        while time.time() < end:
            ready, _, _ = select.select([fd], [], [], 0.05)
            if ready:
                try:
                    chunk = os.read(fd, 4096)
                except OSError:
                    return
                if not chunk:
                    return
                screen += chunk
                end = time.time() + 0.3

    drain(5)
    for line in inputs:
        os.write(fd, line.encode() + b'\r')
        drain(5)
    for _ in range(50):
        if os.waitpid(pid, os.WNOHANG)[0]:
            break
        time.sleep(0.1)
    else:
        os.kill(pid, 9)
        os.waitpid(pid, 0)
        screen += b'\n[the REPL did not exit: check the >>> lines in session.txt]'
    text = ANSI.sub('', screen.decode(errors='replace'))
    return '\n'.join(l.rstrip() for l in text.split('\n')).strip('\n')


def replay(step: Path) -> tuple[str, dict[str, str]]:
    config = json.loads((step / 'step.json').read_text()) if (step / 'step.json').exists() else {}
    session = (step / 'session.txt').read_text()
    with tempfile.TemporaryDirectory() as tmp:
        home = Path(tmp) / 'home'
        project = home / config.get('project', PROJECT)
        home.mkdir()
        if (step / 'project').exists():
            shutil.copytree(step / 'project', project)
        # pip's "a new release is available" notice depends on the date, not the code: switched off.
        env = {**os.environ, 'HOME': str(home), 'NO_COLOR': '1', 'PYTHON_COLORS': '0', 'TERM': 'dumb', 'PS1': '',
               'PIP_DISABLE_PIP_VERSION_CHECK': '1'}
        if config.get('venv'):
            project.mkdir(exist_ok=True)
            subprocess.run(['python', '-m', 'venv', '.venv'], cwd=project, env=env, check=True)
            env['PATH'] = f"{project / '.venv' / 'bin'}:{env['PATH']}"
            env['VIRTUAL_ENV'] = str(project / '.venv')
        cwd = home if config.get('start') == 'home' else project
        blocks: list[str] = []
        for cmd, inputs in commands(session):
            if inputs:
                output = repl(cwd, env, inputs, shlex.split(cmd))
            else:
                script = f'cd {cwd!s}\n{{ {cmd}\n}} 2>&1\necho "{MARK}$PWD"\n'
                state = home / '.spine-state'
                if state.exists():
                    script = state.read_text() + script
                r = subprocess.run(['bash', '-c', script + f'declare -p VIRTUAL_ENV PATH 2>/dev/null > {state}'],
                                   env=env, capture_output=True, text=True)
                text = r.stdout
                output, _, after = text.partition(MARK)
                if after:
                    cwd = Path(after.split('\n')[0])
                output = output.rstrip('\n')
                if state.exists():
                    saved = state.read_text()
                    state.write_text(saved.replace('declare -x', 'export').replace('declare --', 'export') + '\n')
            blocks.append(f'$ {cmd}' + (f'\n{output}' if output else ''))
        transcript = '\n'.join(blocks)
        captured = {name: (project / name).read_text() for name in config.get('capture', [])}
    real = str(home)
    fix = lambda s: s.replace(real, SHOWN_HOME).replace(str(Path(tmp).resolve() / 'home'), SHOWN_HOME)
    return fix(transcript).rstrip('\n') + '\n', {k: fix(v) for k, v in captured.items()}


def masked(text: str, step: Path) -> str:
    """For a volatile step, hide the numbers that legitimately change from run to run."""
    config = json.loads((step / 'step.json').read_text()) if (step / 'step.json').exists() else {}
    return re.sub(r'\d+', '#', text) if config.get('volatile') else text


def main() -> int:
    write = '--write' in sys.argv
    only = [a for a in sys.argv[1:] if not a.startswith('--')]
    steps = sorted(p.parent for p in ROOT.glob('*/*/session.txt'))
    steps = [s for s in steps if not only or any(str(s.relative_to(ROOT)).startswith(o) for o in only)]
    problems = 0
    for step in steps:
        transcript, captured = replay(step)
        name = step.relative_to(ROOT)
        if write:
            (step / 'session.txt').write_text(transcript)
            for file, text in captured.items():
                target = step / 'captured' / file
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(text)
            print(f'wrote {name}')
            continue
        expected = (step / 'session.txt').read_text()
        if masked(transcript, step) != masked(expected, step):
            problems += 1
            print(f'✗ {name}: the terminal pane differs from a real run')
            import difflib
            sys.stdout.writelines(difflib.unified_diff(expected.splitlines(True), transcript.splitlines(True), 'session.txt', 'real run'))
        for file, text in captured.items():
            if (step / 'captured' / file).read_text() != text:
                problems += 1
                print(f'✗ {name}: captured/{file} differs from a real run')
    if not write:
        print(f"{'✗' if problems else '✓'} {len(steps)} spine step(s) replayed, {problems} difference(s)")
    return 1 if problems else 0


if __name__ == '__main__':
    sys.exit(main())
