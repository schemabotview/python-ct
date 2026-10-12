import type { Section } from '../types'

// Every hazard was run: the pickle payload executed print on load, shell=True split the text into two commands, and a ../ path escaped its base. The payload is deliberately harmless. This section describes defences, not attacks, and uses only local, benign demonstrations.
export const securityBoundariesAndUntrustedInput: Section = {
  id: 'security-boundaries-and-untrusted-input',
  title: "Security boundaries: untrusted input, unsafe deserialization, and subprocess assumptions",
  scene: 'untrusted-input',
  focus: 'hazards',
  slide: `## Security boundaries

Treat anything from **outside** your program as **data**, never as code.

### Unsafe deserialization
- \`pickle.loads\` on untrusted bytes can **run code** while loading
- Use \`json.loads\`, or \`ast.literal_eval\` for Python literals
- \`eval\` and \`exec\` on text are the same hazard

### Subprocesses
- \`shell=True\` with user text lets \`;\` start a **second command**
- Pass a **list** of arguments with no shell
- \`check=True\` raises \`CalledProcessError\` on a non-zero exit

### Paths and secrets
- \`resolve()\` and \`is_relative_to(base)\`: block \`../\` escapes
- \`secrets\`, not \`random\`, for tokens
- Keep passwords out of code and logs`,
  narration:
    "Everything that comes from outside your program is untrusted: files, network data, command-line arguments, and what people type. The rule that protects you is to treat it as data, never as code, and the card shows three places where that rule is broken. First, deserialization. The pickle format can rebuild almost any Python object, and that includes calling functions while it loads. The example class tells pickle to call print, and loading the bytes printed code ran during unpickle. Here it was harmless, but a malicious payload could run anything the loading program may do. So never unpickle untrusted data. Use json for data, or ast literal eval for plain Python literals, which refuses anything else, as the failed call showed. Calling eval or exec on text has the same problem. Second, running other programs. With shell equals True and text from a user, a semicolon inside the text starts a second command: the output showed report and then INJECTED, two commands. Passing a list of arguments with no shell treats the whole text as one argument, and the output was a single line. The subprocess run function also has check equals True, which raises CalledProcessError when the program exits with a non-zero status, instead of silently carrying on. Third, paths. A file name supplied by a user can contain dot dot slash to climb out of the folder you intended. Resolving the path and checking that it is still inside your base folder, as in the last line, catches that. Two final habits: use the secrets module, not random, for anything security related, and keep passwords out of source code and logs. These are defensive examples that only touch local, harmless data. Next, turning a script into a real command.",
}
