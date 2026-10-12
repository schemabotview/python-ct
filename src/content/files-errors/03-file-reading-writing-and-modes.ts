import type { Section } from '../types'

// Closing is shown by hand on purpose, so the next section's with statement answers a problem the learner has just seen. The 'w' mode emptying an existing file is stated as the destructive default.
export const fileReadingWritingAndModes: Section = {
  id: 'file-reading-writing-and-modes',
  title: "File reading/writing, modes, and incremental processing",
  scene: 'file-modes',
  focus: 'io',
  slide: `## Reading and writing files

### Opening
- \`open(path, mode, encoding=...)\` returns a **file object**
- The mode decides what is allowed, and what happens to existing data

### Writing
- \`"w"\` **empties** an existing file first
- \`"a"\` adds to the end; \`"x"\` refuses to overwrite
- \`write()\` returns the number of characters written

### Reading
- \`read()\` gets everything; \`readline()\` one line; \`readlines()\` all lines
- \`for line in f\` reads **one line at a time**, so large files fit
- Each line keeps its trailing newline

### Closing
- \`close()\` flushes pending writes and releases the file`,
  narration:
    "To work with a file, you open it. The open function takes a path, a mode, and, for text, an encoding, and gives back a file object. The mode decides what you may do, and the table lists the common ones. Read mode is the default. Write mode creates the file if it is missing, but if it exists, it empties it first, which is a destructive default worth remembering. Append mode keeps what is there and adds to the end. And x mode creates a new file but raises FileExistsError if the file is already present, which protects you from overwriting. The code card writes two lines to a file. Each call to write returns the number of characters written, ten for tea comma three comma four point five and a newline. Then we close the file, which flushes any pending data to disk and releases it. Then we reopen it for reading. Readline returns one line, including its trailing newline character. And a for loop over the file object gives the remaining lines one at a time, so we strip the newline before printing. Reading one line at a time matters for big files, because the program never needs the whole file in memory at once. The alternatives are read, which returns the whole file as one string, and readlines, which returns all lines as a list, and both are fine for small files. Binary modes, with a b, skip decoding and work with bytes. Notice how easy it would be to forget the close call. Next, a way to make that impossible.",
}
