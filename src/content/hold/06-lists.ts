import type { Section } from '../types'

export const lists: Section = {
  id: 'lists',
  title: "Lists: a day's orders",
  scene: 'hold-lists',
  narration:
    "One order is not a day. The pipeline needs to hold many values in sequence, and Python's general-purpose container for that is the list. Line three writes one in square brackets: four SKUs, in the order they were sold. Line four writes the quantities, in the same order. A list can change. Lines six and seven append a fifth sale to each, and the table on the right shows both lists afterwards, with each position's index counted from the start and from the end, exactly as with a string. The output reads the lists in several ways. len gives five items, sku zero is the first, sku minus one the last. A slice of a list is a new list, and one to three gives the items at index one and two. The in operator asks whether a value is present, and count says how many times: E T H two fifty was sold twice. On the same line, sum adds up the quantities: eleven bags in all. The last line asks for index five. The list has five items, numbered zero to four, so there is no index five, and Python stops with an IndexError: list index out of range. It never quietly hands back nothing. That is a choice Python makes again and again, and it is the right one for a pipeline: a wrong answer that looks right is far worse than a clear error. Now look again at the two lists, and at the note on the right. The third SKU only makes sense with the third quantity. They are one record, split across two lists that must stay in step, and the first time someone appends to one and forgets the other, every row after that is wrong. The fix is to keep each record together, which is what the next section does.",
}
