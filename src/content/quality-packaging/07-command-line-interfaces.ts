import type { Section } from '../types'

// Covers the plan's section 7 in full: argparse and exit statuses here (every invocation was run), and the
// pyproject, build and installation boundaries at concept level, with the verified build flow in section 8.
export const commandLineInterfaces: Section = {
  id: 'command-line-interfaces',
  title: "Command-line interfaces, pyproject.toml, builds, and installation boundaries",
  scene: 'cli-interface',
  focus: 'parser',
  slide: `## Command lines, pyproject.toml, and builds

### argparse
- \`add_argument("path")\`: a required **positional**
- \`--tax\`: an **option**, with \`type=float\` and a \`default\`
- \`choices=[...]\` limits values; \`--help\` is generated

### Exit status
- A bad argument prints usage and exits **2**; success is **0**
- \`sys.exit(main())\` passes it to the shell
- \`main(argv=None)\` takes arguments, so a test can call it

### Three boundaries
- **Source**: your \`.py\` files in the project
- **Built**: a **wheel** or sdist made from \`pyproject.toml\`
- **Installed**: files in an environment, with a **command**

### Declaring a command
- \`[project.scripts]\` maps a command name to \`main\``,
  narration:
    "A command-line interface is the layer that turns what a person types into a call to your code. The argparse module, in the standard library, builds one from a description. In the card, build parser creates the parser with a program name and a description. The first argument, path, has no dashes, so it is a required positional argument. Tax starts with two dashes, so it is an optional option. We give it a type of float, so argparse converts the text for us, and a default. Currency uses choices, which limits it to US dollars or euros, and verbose uses store true to make a flag that is false unless given. Argparse writes the help text for you, so asking for help prints a usage line and describes every argument. The table shows what each kind of invocation did, and I ran every one. A complete command runs, with the defaults filled in for options not given. A missing path, a tax of lots, and a currency of pounds each print the usage line and a specific error, and exit with status two. Exit status matters because other programs use it: zero means success, and any other number means failure. At the bottom of the file, sys dot exit of main passes the returned status back to the shell. One design point makes everything easier to test. Main takes the arguments as a parameter that defaults to None, which means use the real command line. A test can call main with a list of arguments directly, with no terminal involved. Keep the real work in ordinary functions, such as those from earlier chapters, and keep the parser thin. Now the boundaries around a project. There are three. The source is your own files. A build turns a pyproject dot toml declaration into a wheel, a ready-to-install file, or a source distribution. And installation puts a built package into an environment, where a project scripts entry maps a command name to your main function, so the command exists. Keeping the three apart tells you what to commit, what to generate, and what to delete and recreate. Next, putting the whole program together and packaging it.",
}
