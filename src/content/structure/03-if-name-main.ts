import type { Section } from '../types'

export const ifNameMain: Section = {
  id: 'if-name-main',
  title: 'if __name__ == "__main__"',
  scene: 'structure-main-guard',
  narration:
    "Every module has a name, stored in a variable called dunder name, short for double underscore name. When a file is imported, its name is the module's name, so importing main dot py gives it the name main. But when a file is run directly, as a script, Python gives it a special name instead: dunder main. The table at the top of the pane shows the two cases. That difference is what the last two lines of main dot py now check. If dunder name equals dunder main, call main. When you type python main dot py, the condition is true and the job runs, as the first command in the terminal shows. When another file, or a test, or you in the REPL, imports main, the condition is false, so the file only defines its names and the job does not run. The second command proves it: importing main and printing its name shows only the word main, and no report is written. And in the REPL, which is itself the main program, dunder name is dunder main. The flow on the right shows the shape every runnable Python file should have. The file runs from top to bottom, but everything above the guard is a definition: imports, constants and functions. Only the guard does anything, and only when the file is run as a script. You will see this idiom at the bottom of almost every Python script you read. It costs two lines, and it is what makes a script safe to import. That matters a great deal in course ten, where the tests import main and every function in the package, many times over, without ever wanting the job to run. Next, writing down what each function expects and returns.",
}
