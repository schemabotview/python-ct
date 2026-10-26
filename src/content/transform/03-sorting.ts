import type { Section } from '../types'

export const sorting: Section = {
  id: 'sorting',
  title: 'Sorting: sorted, key= and lambda',
  scene: 'transform-sorting',
  narration:
    "A report should lead with what matters, so the products should be listed by revenue, highest first. The built in sorted function returns a new list in order, and its key argument decides what the ordering is based on. The table in the middle of the pane takes main dot py's sorting line apart. revenue dot items gives pairs: a product and its amount. The key is a lambda, a small function written in one line without a name, which receives one pair and returns its second item, the amount. So the pairs are compared by amount, and reverse equals True puts the largest first. Then enumerate numbers the ranked pairs as the loop goes, starting at one instead of the default zero, and each pair is unpacked straight into a product and an amount. The terminal, and the chart at the top of the pane, show the ranking: Kenyan, Colombian, Ethiopian, Brazilian. Notice that sorted never changes the dictionary itself. It reads the items, and builds a new list, which is the safest kind of operation. The key does not have to be a lambda. Any function that takes one item will do. In the REPL, sorting the products by bags passes the Counter's own get method as the key, so each product is compared by its bag count, and the answer comes back in the opposite order, smallest first: Brazilian, Kenyan, Colombian, Ethiopian. The note at the bottom says why the two rankings differ: Kenyan sells few bags, but each one is a kilogram at thirty one. Rank by the question you are actually asking. Next, the middle of the numbers, and when to round.",
}
