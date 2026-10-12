import type { Section } from '../types'

// Both failure modes of running a package file directly were verified: relative imports give ImportError (no parent package) and absolute imports give ModuleNotFoundError (the script's folder, not the project root, is on the path).
export const scriptEntryPointsAndPythonM: Section = {
  id: 'script-entry-points-and-python-m',
  title: "Script entry points, __name__, and python -m",
  scene: 'entry-points',
  focus: 'runs',
  slide: `## Script entry points and python -m

### \`__name__\`
- When a file is **run**, \`__name__\` is \`"__main__"\`
- When it is **imported**, \`__name__\` is its module path: \`"orders.cli"\`

### The guard
- \`if __name__ == "__main__":\` runs \`main()\` only when run
- Importing the module then has no side effects

### python -m
- \`python -m orders.cli\` runs a module **as part of its package**
- \`python orders/cli.py\` fails: relative imports raise \`ImportError\`; absolute ones \`ModuleNotFoundError\`
- \`python -m orders\` runs \`orders/__main__.py\`

### Why \`-m\` works
- Run it from the **project root**, so \`orders\` can be found
- Python sets the package context, so \`.calc\` resolves
- Top-level code with no guard runs on **every** import`,
  narration:
    "Every module has a built-in name called double-underscore name. When Python runs a file as the program, that name is the text main. When the file is imported by another module, the name is the module's own path, such as orders dot cli. That small difference lets one file be both a library and a program. The bottom of the code card shows the pattern: if name equals main, then call main. Run the file, and main runs. Import it from somewhere else, and nothing runs, so importing has no side effects, and its functions are simply available. The table shows four ways to start the reporting program, and each one was run. First, python orders slash cli dot py. Python treats cli dot py as a lone script, with no parent package, so the relative import at its top fails with an ImportError. If the file used absolute imports instead, it would fail with a ModuleNotFoundError, because Python puts the script's own folder on the path, not the project's root folder. Second, python dash m orders dot cli. The dash m flag runs the module as part of its package, relative imports work, and it prints the total, twenty-one fifty. Third, python dash m orders runs the package's main file, which imports cli and calls main itself. In that case cli's name is orders dot cli, so its guard does not fire, and main file does the calling. And fourth, simply importing orders dot cli runs nothing yet, because the guard is false. Python also sets the package context for dash m, and you run it from the project root so the package can be found. Without a guard, top-level code runs every time the module is imported, which is almost never what you want. As a rule, start package code with dash m from the project root. Next, the modules that come with Python.",
}
