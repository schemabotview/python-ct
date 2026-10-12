import type { Section } from '../types'

// Closes the data-structure arc by combining everything into the shapes real order data takes. Unpacking is shown with a count mismatch so the error is recognised later.
export const unpackingNestedCollectionsAndRecordShapes: Section = {
  id: 'unpacking-nested-collections-and-record-shapes',
  title: "Unpacking, nested collections, and record shapes",
  scene: 'unpack-nested',
  focus: 'code',
  slide: `## Unpacking, nested collections, and record shapes

### Unpacking
- \`oid, item, qty = order\` binds one name per item
- The counts must match, or a \`ValueError\` says so
- \`*rest\` collects the remainder in a list
- \`x, y = y, x\` swaps two names

### Nested collections
- \`orders[0]["lines"][1][0]\` reads one level at a time
- Unpack inside a loop: \`for name, q, p in lines:\`

### What goes wrong
- \`a, b = [1, 2, 3]\` raises a \`ValueError\`: too many values
- \`rec["coupon"]\` for an absent key raises a \`KeyError\`

### Choosing a record shape
- **Tuple** — fixed fields, read by position
- **Dictionary** — named fields, read by key
- **List of records** — many rows with one shape`,
  narration:
    "Real data is rarely a single flat collection, so this section puts the pieces together. First, unpacking. When you write three names on the left of an equals sign and a three-item sequence on the right, Python binds each name to the matching item. So oid, item, and qty receive the id, the item, and the quantity from the order. The counts must match: unpacking three items into two names raises a ValueError saying there were too many values. A name with a star in front collects whatever is left into a list, so first, star rest, on ten, twenty, thirty gives ten, and a rest of twenty and thirty. The last line of that group shows a neat idiom: writing x, y equals y, x swaps two names in one statement. Second, nested collections. Our orders are a list of dictionaries, each holding a list of line tuples. To read the name of the second line of the first order, you move one level at a time: the first order, then its lines, then the second line, then the first field. Each pair of brackets goes one level deeper. And in a loop you can unpack each line directly into a name, a quantity and a price. The table compares the four shapes you now know. Nesting has its own failures, and each one is a lesson from earlier: an index past the end of a list raises an IndexError, and an absent key raises a KeyError, so read nested data one level at a time and you can tell which level failed. Pick a tuple for fixed fields by position, a dictionary for named fields, and a list of records for many rows that share a shape. Next, we sort and summarise.",
}
