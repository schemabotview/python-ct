import type { Scene } from '@graphlearning/flow'

// §6 — three real hazards, each shown with the output it produced, and the safe alternative for each.
// The pickle payload ran print() on load, to show code executing; a real attacker's payload would run
// anything the loading process is allowed to.
export const untrustedInput: Scene = {
  id: 'untrusted-input',
  title: 'Data is not code',
  flow: 'TB',
  nodes: [
    {
      id: 'hazards',
      kind: 'code',
      filename: 'hazards.py',
      label: `class Evil:
    def __reduce__(self): return (print, ("code ran during unpickle!",))
pickle.loads(pickle.dumps(Evil()))        # code ran during unpickle!

name = "report; echo INJECTED"
subprocess.run(f"echo {name}", shell=True)    # ['report', 'INJECTED']: two commands ran
subprocess.run(["echo", name])                # ['report; echo INJECTED']: one argument

(base / "../../etc/passwd").resolve().is_relative_to(base)   # False: escaped the folder`,
    },
    {
      id: 'safer',
      kind: 'table',
      label: 'Untrusted input: the safer choice',
      headers: ['Risk', 'Instead use'],
      values: [
        ['pickle.loads(untrusted)', 'json.loads, or ast.literal_eval'],
        ['eval(text), exec(text)', 'parse it; never run it'],
        ['shell=True with user text', 'a list of arguments, no shell'],
        ['a path from a user', 'resolve() and check it stays inside'],
        ['random for a token', 'secrets.token_hex()'],
      ],
    },
  ],
  edges: [{ source: 'hazards', target: 'safer', label: 'the safer choice' }],
}
