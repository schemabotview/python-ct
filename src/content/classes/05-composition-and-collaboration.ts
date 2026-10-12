import type { Section } from '../types'

// Composition is taught before inheritance because it is the default choice. The key design point is that Order asks each line for its total instead of reaching into the line's fields.
export const compositionAndCollaboration: Section = {
  id: 'composition-and-collaboration',
  title: "Composition, responsibilities, and object collaboration",
  scene: 'composition-diagram',
  focus: 'order',
  slide: `## Composition and responsibilities

### Has-a
- An \`Order\` **has** \`LineItem\` objects, stored in \`self.lines\`
- Each class keeps **one** responsibility

### Collaboration
- \`Order.total()\` asks each line: \`line.total()\`
- It does not reach into \`line.qty\` and \`line.price\`

### Why it works
- Change how a line computes its total, and \`Order\` is untouched
- Each class can be tested on its own

### Choosing
- Use composition when one object **contains** or **uses** another
- Prefer it to inheritance unless the relation is truly "is a"`,
  narration:
    "Real programs are made of objects that work together. Composition is the simplest way: one object holds other objects. In the card, an Order has a list of lines, set up in init, and each line is a LineItem. We say an Order has line items, a has-a relationship. Now look at the responsibilities. A LineItem knows how to compute its own total from its quantity and price. An Order knows how to add a line and how to total the whole order, but it does not know how a line does its arithmetic. Order dot total asks each line for its total and adds the answers up. The diagram shows that: the order asks tea, which answers thirteen point five, and asks mug, which answers eight, so the order reports twenty-one point five. This is collaboration, and the design principle behind it is that one class should not reach inside another's fields. If the order calculated quantity times price itself, then changing how a line is priced, say adding a discount, would mean changing the order too. Because it asks the line for its total, the order is untouched when a line changes. A second benefit is testing: each class can be tested alone. So when should you use composition? Whenever one object contains or uses another, which is most of the time. It is also the safer default over inheritance, which we meet next, unless the relationship is genuinely an is-a relationship.",
}
