import type { Section } from '../types'

// The commands are illustrations: the learner is not asked to run them. Creating a venv and listing it were verified; installing from the network was not run. The distribution-versus-import-name table uses well-known pairs.
export const virtualEnvironmentsAndDependencies: Section = {
  id: 'virtual-environments-and-dependencies',
  title: "Virtual environments, interpreters, and installing dependencies",
  scene: 'venv-commands',
  focus: 'commands',
  slide: `## Virtual environments and installing dependencies

### The problem
- Projects need different versions of the same package
- One shared install makes them collide

### The solution
- A **virtual environment** is a folder with its own installed packages
- It is tied to one **interpreter**, such as Python 3.14
- \`python -m venv .venv\` creates it; activate it before installing

### Installing
- \`python -m pip install name\` installs into the active environment only
- \`pip freeze\` lists the exact installed versions

### Two names
- The **distribution** is what you \`pip install\`; the **import package** is what you \`import\`
- \`pillow\` provides \`PIL\`; \`scikit-learn\` provides \`sklearn\``,
  narration:
    "Libraries from outside the standard library are installed with a tool called pip, and that raises a problem. One project may need version one of a package, and another may need version two. If everything is installed in one place, they collide. The solution is a virtual environment: a folder containing its own copy of the installed packages, tied to a particular Python interpreter, the python program itself. The commands in the card are illustrations, and you do not need to run them. Python dash m venv dot venv creates an environment in a folder named dot venv. Activating it, with a command that differs on Windows, makes the python and pip commands in your terminal use that environment. Then python dash m pip install, followed by a name, installs a package into that environment only. Pip list shows what the environment contains, and a new one holds almost nothing. And pip freeze writes out the exact version of everything installed, which can be saved to a file. Many Linux systems also mark their own Python as managed by the operating system and refuse to install into it, which is another reason to use an environment. Now the source of much confusion, shown in the table. The name you give pip, the distribution, is not always the name you import. You pip install pillow but import PIL. You pip install scikit-learn but import sklearn, and you pip install beautifulsoup4 but import bs4. Keep the two ideas apart: the distribution is the thing you install, and the import package is the thing you use in code. Finally, an environment is disposable. It is not part of your source, so you never commit it, and you can delete and recreate it whenever you like. Next, how a project records what it needs.",
}
