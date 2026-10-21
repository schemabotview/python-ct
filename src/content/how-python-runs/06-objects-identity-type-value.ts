import type { Section } from '../types'

export const objectsIdentity: Section = {
  id: 'objects-identity-type-value',
  title: 'Objects: identity, type and value',
  scene: 'objects-heap',
  narration:
    "Every object in Python has exactly three things: an identity, a type, and a value, and knowing which one you are asking about prevents a whole class of bugs. In this file, a and b are two lists built separately with the same contents. The terminal shows what Python thinks of them. A equals equals b is true: double equals compares values, and both lists hold the same two products. But a is b is false: is compares identity, and these are two different objects. The third line prints their identities with the id function. In CPython the identity is the object's address in memory, which is why the numbers are large, and why you will see different numbers every time you run it. Only the comparison matters, never the number itself. The fourth line asks for types: a is a list, and len of a is an int. The type decides what an object can do; a list can be appended to, an int can be added. On the right, the two objects sit on the heap side by side: different identities, the same type, equal values. So the rule is simple. Use double equals to ask whether two things have the same value, which is what you want almost every time. Use is only to ask whether two names point at the very same object, and in everyday code that mostly means checking for None, as in x is None. Mixing them up is a classic bug: two lists can be equal without being the same object, and changing one then leaves the other untouched. Next, how long an object lives, and who decides when it goes.",
}
