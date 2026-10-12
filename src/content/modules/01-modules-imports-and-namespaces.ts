import type { Section } from '../types'

// Opens the chapter by turning the one large script from Chapter 5 into modules. The module-level print is used on purpose to make import-time execution observable; the shadowing of json by a local json.py was verified.
export const modulesImportsAndNamespaces: Section = {
  id: 'modules-imports-and-namespaces',
  title: "Modules, imports, namespaces, and import-time execution",
  scene: 'import-forms',
  focus: 'files',
  slide: `## Modules, imports, and namespaces

A **module** is a Python file you can import.

### Importing
- \`import calc\` runs \`calc.py\` once and binds the name \`calc\`
- Later imports reuse the cached module in \`sys.modules\`
- Its names stay in its **namespace**: \`calc.line_total\`

### Import forms
- \`from calc import line_total\` copies one name into this module
- Avoid \`from calc import *\`: it hides where names come from

### Import-time execution
- Top-level statements run **during** the import
- Keep them to definitions: no printing, no real work

### Where Python looks
- A file named \`json.py\` in your folder hides the real \`json\``,
  narration:
    "The program from the last chapter is getting crowded. It reads, validates, calculates, and reports in one file. Python's answer is to split code across files, and every Python file is already a module. To use one module from another, you import it. In the card, calc dot py defines line total, and main dot py imports calc. When Python executes import calc for the first time, it finds the file, runs it from top to bottom, and binds the name calc to the resulting module object. Notice the print statement at the top of calc. It runs during the import, which is why we see loading calc, exactly once. The second import calc prints nothing, because Python remembers modules it has loaded in a dictionary called sys dot modules and reuses them. Everything calc defines lives in the module's own namespace, a private table of names. That is why we call calc dot line total, and why a name in calc cannot clash with a name in main. The table shows four ways to import. Import calc binds one name, calc. From calc import line total copies a single name into this module. Import calc as c is the same module under a shorter name. And from calc import star pulls in everything, which we avoid, because a reader can no longer tell where a name came from. Because top-level statements run at import time, a module should mostly contain definitions, not printing or real work. Finally, where does Python look? In the script's own folder first, then the standard library, then installed packages. So a file of yours named json dot py will hide the real json module, a surprisingly common mistake. Next, grouping modules into packages.",
}
