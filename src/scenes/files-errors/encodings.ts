import type { Scene } from '@graphlearning/flow'

// §2 — encoding and decoding on the product name, a decoding failure with its real message, and how
// many bytes different text needs. The wrong-codec case (latin-1) is the dangerous one: no error.
export const encodings: Scene = {
  id: 'encodings',
  title: 'Text becomes bytes at the boundary',
  flow: 'TB',
  nodes: [
    {
      id: 'codec',
      kind: 'code',
      filename: 'encoding.py',
      label: `data = "café".encode("utf-8")   # text to bytes
data                            # b'caf\\xc3\\xa9'
data.decode("utf-8")            # 'café'
data.decode("latin-1")          # 'cafÃ©': wrong codec, no error

b"caf\\xe9".decode("utf-8")
# UnicodeDecodeError: 'utf-8' codec can't decode byte 0xe9 in position 3:
#   unexpected end of data
"café".encode("ascii")          # UnicodeEncodeError`,
    },
    {
      id: 'sizes',
      kind: 'table',
      label: 'Characters versus UTF-8 bytes',
      headers: ['Text', 'Characters', 'UTF-8 bytes'],
      values: [
        ['"cafe"', '4', '4'],
        ['"café"', '4', '5'],
        ['"日本"', '2', '6'],
        ['"😀"', '1', '4'],
      ],
    },
  ],
  edges: [{ source: 'codec', target: 'sizes', label: 'one character, 1 to 4 bytes' }],
}
