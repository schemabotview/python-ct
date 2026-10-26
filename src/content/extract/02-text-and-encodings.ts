import type { Section } from '../types'

export const textAndEncodings: Section = {
  id: 'text-and-encodings',
  title: 'Text and encodings',
  scene: 'extract-encodings',
  narration:
    "The second day's file comes from the shop's old till, and it hides a problem you cannot see by looking at it. A file is not text; it is bytes, and turning bytes into text needs an encoding, a rule for which bytes mean which characters. The modern standard is UTF eight, and Python three point fifteen now uses it by default whenever you open a file. The old till, though, saves files in an older encoding called Latin one. For plain letters and digits the two agree. They disagree as soon as a customer has an accent. The table at the top of the pane shows the name Zoé as the till saved it: two ordinary bytes, then one byte for the é. In Latin one, that byte means é. In UTF eight, a byte like that cannot appear on its own, so decoding it as UTF eight fails. main dot py now reads both day files through a new function, read text. It asks for UTF eight first. If that raises a UnicodeDecodeError, it says so on the terminal, and reads the file as Latin one instead, because the shop has confirmed that is what the old till writes. The second command, file, is a standard tool that guesses a file's type, and it agrees: ISO eight eight five nine, which is Latin one's official name. Now the second day prices correctly, including Zoé's two bags. Two habits matter. Always say which encoding you mean, even though three point fifteen now defaults to UTF eight; and never let a program guess silently. Ours guesses only from a short list the shop confirmed, and it tells you every time it does. Next, finding every day's file automatically.",
}
