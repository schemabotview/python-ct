import type { Scene } from '@graphlearning/flow'

// §3 — the name-to-object picture the rest of the course keeps coming back to. Names are on the
// left and own nothing; every value is an object on the right, labelled with its type. Reference
// diagrams in later chapters (aliasing, argument binding) extend this one.
export const namesToObjects: Scene = {
  id: 'names-to-objects',
  title: 'Names refer to objects',
  flow: 'LR',
  nodes: [
    {
      id: 'names',
      label: 'Names',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'item', label: 'item', pattern: 'user', icon: 'tag' },
        { id: 'price', label: 'price', pattern: 'user', icon: 'tag' },
        { id: 'quantity', label: 'quantity', pattern: 'user', icon: 'tag' },
        { id: 'taxable', label: 'taxable', pattern: 'user', icon: 'tag' },
        { id: 'coupon', label: 'coupon', pattern: 'user', icon: 'tag' },
      ],
    },
    {
      id: 'objects',
      label: 'Objects',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'o-item', label: "'tea'", sub: 'str', pattern: 'storage', icon: 'box' },
        { id: 'o-price', label: '4.5', sub: 'float', pattern: 'storage', icon: 'box' },
        { id: 'o-quantity', label: '3', sub: 'int', pattern: 'storage', icon: 'box' },
        { id: 'o-taxable', label: 'True', sub: 'bool', pattern: 'storage', icon: 'box' },
        { id: 'o-coupon', label: 'None', sub: 'NoneType', pattern: 'storage', icon: 'box' },
      ],
    },
  ],
  edges: [
    { source: 'item', target: 'o-item' },
    { source: 'price', target: 'o-price' },
    { source: 'quantity', target: 'o-quantity' },
    { source: 'taxable', target: 'o-taxable' },
    { source: 'coupon', target: 'o-coupon' },
  ],
}
