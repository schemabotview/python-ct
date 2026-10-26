import type { Section } from '../types'

export const dictionaries: Section = {
  id: 'dictionaries',
  title: 'Dictionaries: the catalogue, and a record with names',
  scene: 'hold-dicts',
  narration:
    'A dictionary maps keys to values, and it solves two problems at once. First, the catalogue. main dot py now defines CATALOGUE, a dictionary from each product code to its price, written in capitals because it is a constant the program should not change. Second, the order lines themselves. Each line is now a dictionary too, with named fields: id, customer, sku and quantity. That is clearer than a tuple, where you had to remember that the quantity lived in slot two. The customer field is new, and we will need it. The diagram at the top shows the two dictionaries working together, for the first line. Its sku field holds E T H two fifty, and using that as a key in the catalogue looks up the price, nine point nine five, which is what line twenty two does. The terminal confirms the first line still comes to twenty nine point eight five. In the REPL, asking the catalogue for Colombian returns its price as a Decimal. Asking for B R A five hundred, a Brazilian coffee that is not in our catalogue yet, raises a KeyError, naming the key it could not find. That is the correct behaviour: a pipeline that quietly priced an unknown product at zero would be far worse. We will handle unknown products properly in course four. The table at the bottom explains why dictionaries are fast. Python computes a hash of the key, a number derived from it, and that number tells it where to look. So looking up a key takes one step, whether the dictionary holds three products or three million. Next, a collection with no duplicates, and a dictionary that cannot change.',
}
