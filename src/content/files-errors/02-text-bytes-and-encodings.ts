import type { Section } from '../types'

// The UnicodeDecodeError wording is shown exactly as CPython printed it and the narration says wording can vary. The wrong-codec case that raises nothing is the dangerous one and is called out separately.
export const textBytesAndEncodings: Section = {
  id: 'text-bytes-and-encodings',
  title: "Unicode text, bytes, encoding, and decoding boundaries",
  scene: 'encodings',
  focus: 'codec',
  slide: `## Unicode text, bytes, and encodings

### Two different types
- \`str\` is **text**: a sequence of characters
- \`bytes\` is raw **data**: numbers from 0 to 255
- They never mix: \`"a" + b"b"\` raises a \`TypeError\`

### Encoding and decoding
- \`.encode("utf-8")\` turns text into bytes; \`.decode("utf-8")\` reverses it
- In UTF-8, one character takes 1 to 4 bytes

### Boundaries
- Text becomes bytes whenever it leaves the program: files, networks
- Always name the encoding: \`open(..., encoding="utf-8")\`

### When it goes wrong
- A wrong codec may **raise**, or silently give wrong text: \`'cafÃ©'\`
- \`errors="replace"\` hides the problem; use it only on purpose`,
  narration:
    "A file on disk does not contain characters. It contains bytes, which are numbers from zero to two hundred and fifty-five. So text has to be converted to bytes on the way out, which is called encoding, and converted back on the way in, which is decoding. Python keeps the two ideas as separate types. A str is text, a sequence of characters. A bytes object is raw data. They never mix, and trying to add one to the other raises a TypeError. The most common encoding is UTF-8, which can represent every character in Unicode. The table shows that one character can need between one and four bytes. The letter e is one byte, but e with an accent is two, so café has four characters but five bytes. Two Japanese characters need six bytes, and an emoji needs four. In the code card, we encode café and get the bytes c, a, f, and then two bytes for the accent. Decoding with UTF-8 gets the text back. Now the failures. Decoding the bytes with the wrong codec, here latin-1, does not raise anything. It quietly produces the wrong text, a capital A with a tilde followed by a copyright sign. That is the dangerous case, because nothing tells you. Other mismatches do raise, such as a UnicodeDecodeError when a byte is not valid in the encoding, and the exact wording of that message can vary between Python versions. Encoding text that the codec cannot represent, such as an accent into ASCII, raises a UnicodeEncodeError. The lesson is to always name the encoding when you open a file, and to use UTF-8 unless you know better. An errors setting of replace hides problems rather than fixing them, so use it only deliberately. Next, reading and writing files.",
}
