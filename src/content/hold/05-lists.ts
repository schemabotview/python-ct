import type { Section } from '../types'

export const lists: Section = {
  id: 'lists',
  title: 'Lists: a day of order lines',
  scene: 'hold-lists',
  narration:
    "One order line is not a day of business. The shop's first day has four lines, and Python's everyday way to hold several values in order is a list. main dot py now has two lists: the product codes of the four lines, and their quantities. The diagram on the right draws each one as a list object, with numbered slots starting at zero, and a name referring to each. Two of the slots in the codes list hold the same product, Ethiopian, because two customers ordered it, and a list is perfectly happy to hold duplicates. Lists come with useful tools, and the table below shows four of them. len gives the number of items, four lines. sum adds up numbers, so the quantities total eighteen bags, and the terminal shows both. An index in square brackets picks out one item, so skus at zero is the first code. And a list can change: in the REPL, append adds a new item at the end, and the list grows from two codes to three. That ability to change is what makes lists the right home for a day's orders, which arrive one at a time. The same section shows a weakness in this design, and the note at the bottom names it. The two lists only belong together by position. The quantity for the third code is whatever sits in slot two of the other list. Add a line to one list and forget the other, and every line after it is silently wrong. That kind of mistake does not raise an error, which makes it dangerous. The fix is to keep each line's values together as one record. Next, the tuple.",
}
