import type { Section } from '../types'

// Dictionaries are the record shape with named fields. The missing-key handling is taught here because it is the first failure learners meet with them.
export const dictionariesKeyValueRecords: Section = {
  id: 'dictionaries-key-value-records',
  title: "Dictionaries: key/value records",
  scene: 'dict-lookups',
  focus: 'record',
  slide: `## Dictionaries: key/value records

A **dictionary** maps **keys** to values. You look things up by key, not by position.

### Building and changing
- \`{"id": "A-1001", "item": "tea", "qty": 3}\`
- \`order["qty"] = 4\` updates; \`order["coupon"] = "SAVE5"\` adds
- \`order.pop("coupon")\` removes a key and returns its value

### Missing keys
- \`order["coupon"]\` raises a \`KeyError\`
- \`order.get("coupon")\` gives \`None\`; add a second argument for a default
- \`"coupon" in order\` tests for a key

### Order and keys
- Dictionaries keep **insertion order**
- Keys must be hashable: strings, numbers, tuples of those
- \`list(order)\` gives the keys; \`.values()\` and \`.items()\` give the rest`,
  narration:
    "When fields have names, a dictionary is the natural shape. A dictionary maps keys to values, and you look something up by its key rather than by its position. Our order is now a dictionary with the keys id, item, and qty. Reading a value uses square brackets with the key. Assigning to an existing key updates it, and assigning to a new key adds it, so the same syntax does both. Pop removes a key and returns the value that was stored. The list and values calls on the card show the keys and values in the order they were inserted. Since Python three point seven, that insertion order is guaranteed, so a dictionary remembers the order in which you built it. Now the table, which is about a failure you will meet constantly. If you ask for a key that is not there using square brackets, Python raises a KeyError. That is often correct, because a missing field may be a real bug. But when a missing key is normal, use the get method. Get returns None if the key is absent, and if you pass a second argument, it returns that instead, as a default. And the in operator asks whether a key exists without fetching anything. One rule about keys: they must be hashable, which in practice means strings, numbers, and tuples of those, but not lists. Next, a collection that keeps only the keys.",
}
