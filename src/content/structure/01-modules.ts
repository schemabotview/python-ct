import type { Section } from '../types'

export const modules: Section = {
  id: 'modules',
  title: 'Modules: what import runs',
  scene: 'structure-modules',
  narration:
    'Part one ended with a pipeline that works, in one file of nearly two hundred lines. That is fine for one person on one afternoon, and painful for anyone who has to find something later. Part two makes the pipeline real, and the first step is to give it structure. A module is simply a Python file, and any file can import another. So the two extract functions, read text and iter rows, move out of main dot py into a new file, extract dot py, along with the csv import they need. main dot py gets one new line: from extract import iter rows. The program runs exactly as before, and the terminal shows the same October total. What does import actually do? The first time a module is imported, Python finds the file, runs it from top to bottom, and keeps the resulting module object in a dictionary called sys dot modules. Running extract dot py only defines two functions, so importing it is quick and has no side effects. Any later import of the same name finds it in sys dot modules and runs nothing. The REPL shows that entry: the key extract, and a module object that remembers which file it came from. The diagram on the right is the import graph so far: main imports extract. Python three fifteen adds a new word here: lazy. A lazy import binds the name immediately but loads the module only the first time the name is actually used. In the REPL, after lazy import sqlite3, sqlite3 is not yet in sys dot modules. Asking for its version loads it, and now it is. For a command line tool that only sometimes touches a heavy module, that makes starting up faster. Next, more than one module.',
}
