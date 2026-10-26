import type { Section } from '../types'

export const theRightDataStructure: Section = {
  id: 'the-right-data-structure',
  title: 'The right data structure: set versus list',
  scene: 'speed-data-structures',
  narration:
    "Back in the model course, Orders answered the in operator by checking every line's id in turn, until it found a match or ran out. For a hundred and sixty three lines that is instant. But the cost grows with the data: twice the lines, twice the checks. A set answers the same question differently. It stores each item at a position computed from its hash, so asking whether an id is present means computing one hash and looking in one place, however many items there are. Orders now builds a set of its ids once, when it is created, and dunder contains simply asks the set. Nothing else changes, and the tests still pass. How big is the difference? bench slash lookup dot py measures it, using timeit, which runs a statement many times and reports the time. It asks for an id that is not there, the worst case for a list, at three sizes. For a thousand ids the list takes about ten microseconds, and the set a few hundredths of a microsecond. At ten thousand, the list takes roughly ten times as long, and at a hundred thousand, ten times longer again, nearly eight hundred microseconds. The set barely moves. The plot on the right shows the shape: the list climbs steeply, and the set lies flat along the bottom. That shape matters far more than any single number on one machine. The general lesson is to match the structure to the question. Ask is this present often, use a set, or a dictionary for a value. Keep the order, use a list. Look up by key, use a dictionary. Choosing well costs nothing, and choosing badly can turn seconds into hours. Next, memory.",
}
