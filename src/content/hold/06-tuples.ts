import type { Section } from '../types'

export const tuples: Section = {
  id: 'tuples',
  title: 'Tuples and unpacking',
  scene: 'hold-tuples',
  narration:
    "An order line is a record: an order number, a product code and a quantity that belong together. Python's simplest record is a tuple, written with round brackets, and main dot py now holds the day as a list of four tuples, one per line. The two parallel lists are gone, and with them the risk of the values drifting apart. A tuple is like a list in that it keeps its items in order and you can index it. The difference is that a tuple cannot be changed. In the REPL, trying to set the quantity of the first line to four fails with a TypeError: a tuple does not support item assignment. The table in the middle of the pane puts the two side by side. A list holds many things of one kind and can grow, like the day's lines. A tuple holds one fixed record, like a single line. That fixedness is a feature: a record that cannot change by accident is one less thing to worry about. Tuples also make unpacking natural, and main dot py uses it on line fifteen. order id, sku, quantity equals the first line. Python takes the tuple's three slots and binds three names, one each, from left to right, which is exactly what the diagram at the top draws. The number of names has to match the number of slots, or Python raises an error rather than guessing. The output shows the first line, priced, and the total is still correct to the cent. But look at the price on line sixteen: it is still a single value written by hand, the same for every product. To price every line, the pipeline needs a way to look prices up. Next, the dictionary.",
}
