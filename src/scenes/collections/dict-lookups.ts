import type { Scene } from '@graphlearning/flow'

// §4 — one order as a dictionary, being changed, then every way of asking for a key that may not be
// there. The table answers on the record as it stands after the coupon has been removed.
export const dictLookups: Scene = {
  id: 'dict-lookups',
  title: 'A dictionary maps keys to values',
  flow: 'TB',
  nodes: [
    {
      id: 'record',
      kind: 'code',
      filename: 'dicts.py',
      label: `order = {"id": "A-1001", "item": "tea", "qty": 3}
order["item"]              # 'tea'
order["qty"] = 4           # update an existing key
order["coupon"] = "SAVE5"  # add a new key
len(order)                 # 4
order.pop("coupon")        # 'SAVE5'
list(order)                # ['id', 'item', 'qty']
list(order.values())       # ['A-1001', 'tea', 4]`,
    },
    {
      id: 'lookups',
      kind: 'table',
      label: 'Asking for a key that may be missing',
      headers: ['Expression', 'Result'],
      values: [
        ['order["qty"]', '4'],
        ['order["coupon"]', "KeyError: 'coupon'"],
        ['order.get("coupon")', 'None'],
        ['order.get("coupon", "none")', "'none'"],
        ['"coupon" in order', 'False'],
      ],
    },
  ],
  edges: [{ source: 'record', target: 'lookups', label: 'reading one key' }],
}
