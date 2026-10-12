import type { Scene } from '@graphlearning/flow'

// §3 — writing then reading a small file with explicit close, and the table of modes. Closing is done
// by hand here on purpose: the next section's with statement is the answer to how easy it is to forget.
export const fileModes: Scene = {
  id: 'file-modes',
  title: 'Open, read or write, close',
  flow: 'TB',
  nodes: [
    {
      id: 'io',
      kind: 'code',
      filename: 'files.py',
      label: `f = open("orders.txt", "w", encoding="utf-8")  # create or empty
f.write("tea,3,4.5\\n")           # 10 characters written
f.write("mug,1,8.0\\n")
f.close()                        # flush and release the file

f = open("orders.txt", encoding="utf-8")
f.readline()                     # 'tea,3,4.5\\n'
for line in f:                   # the rest, one line at a time
    print(line.strip())          # mug,1,8.0
f.close()`,
    },
    {
      id: 'modes',
      kind: 'table',
      label: 'File modes',
      headers: ['Mode', 'Purpose', 'If the file exists'],
      values: [
        ['"r"', 'read text', 'read from the start'],
        ['"w"', 'write text', 'emptied first'],
        ['"a"', 'append text', 'kept, added to'],
        ['"x"', 'new file only', 'FileExistsError'],
        ['"rb" / "wb"', 'bytes', 'no decoding'],
      ],
    },
  ],
  edges: [{ source: 'io', target: 'modes', label: 'what each mode does' }],
}
