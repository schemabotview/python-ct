import type { Section } from '../types'

// Opens the chapter at the boundary where the program meets the disk. The class name PosixPath versus WindowsPath is called out so the printed form is not mistaken for an error on another system.
export const pathsAndFilesystemOperations: Section = {
  id: 'paths-and-filesystem-operations',
  title: "Paths and filesystem operations with pathlib",
  scene: 'path-parts',
  focus: 'ops',
  slide: `## Paths and filesystem operations

A **path** names a location on disk. \`pathlib.Path\` gives it methods.

### Building paths
- \`Path("data") / "orders.csv"\` joins parts with the right separator
- Relative paths start at the **working directory**
- Paths print as \`PosixPath\` or \`WindowsPath\`, by system

### Reading a path
- \`.name\`, \`.stem\`, \`.suffix\` and \`.parent\` split it into parts
- \`.with_suffix(".json")\` makes a **new** path; the original is unchanged

### Asking and acting
- \`.exists()\`, \`.is_file()\` and \`.is_dir()\` ask without changing anything
- \`.mkdir(exist_ok=True)\`, \`.glob("*.csv")\` and \`.read_text()\` act on the disk
- A missing file raises \`FileNotFoundError\``,
  narration:
    "Until now, our order data has lived inside the program. This chapter is about the boundary, where a program meets files, and the first thing to know is how to talk about where a file is. A path is the name of a location on disk, and the pathlib module gives it a Path object with useful methods. You build a path by joining parts with the slash operator, so Path of data, slash, orders dot csv, is the path to a file called orders dot csv inside a folder called data. Python uses the correct separator for your system, which means the same code works on Windows and on Linux. A relative path like this one starts from the current working directory, the folder the program was started from. When Python prints a path, you may see the name PosixPath or WindowsPath, depending on your system. That is the same object, just labelled for your platform. The table shows how a path comes apart. Name is the file name, stem is the name without its extension, suffix is the extension, and parent is the folder. With suffix returns a new path with a different extension, and leaves the original unchanged. Other methods ask questions without changing anything, such as exists and is file, or act on the disk, such as making a folder, listing files that match a pattern with glob, and reading or writing a whole small text file. If you read a file that is not there, Python raises a FileNotFoundError, which we will learn to handle later in this chapter. Next, what is actually inside a text file.",
}
