import type { Section } from '../types'

// The container case relies on the legacy iteration protocol via __getitem__, verified to make for, in, list, max and sorted work without __iter__. NotImplemented is taught as cooperation, not as an error.
export const specialMethodsForContainersAndOperators: Section = {
  id: 'special-methods-for-containers-and-operators',
  title: "Special methods for sequence/container behaviour and operator cooperation",
  scene: 'container-operators',
  focus: 'container',
  slide: `## Special methods for containers and operators

Syntax calls **special methods**, spelled with double underscores.

### Containers
- \`len(x)\` calls \`__len__\`; \`x[i]\` calls \`__getitem__\`
- With just these two, \`for\`, \`in\`, \`max\` and \`list\` already work
- \`__iter__\` and \`__contains__\` make them faster or clearer

### Operators
- \`a + b\` calls \`a.__add__(b)\`; \`a < b\` calls \`__lt__\`
- Return \`NotImplemented\` for a type you do not handle
- Python then tries the other operand, then raises \`TypeError\`

### Cooperating
- \`3 * money\` needs \`__rmul__\`
- \`sum()\` starts from \`0\`: pass \`Money(0)\` as the start`,
  narration:
    "Nearly all of Python's syntax is a call to a special method, and that is what lets your classes behave like built-in ones. Take containers first. Our Order class defines only two methods: len, which returns the number of lines, and getitem, which returns a line by index. With just those two, a surprising amount works. The len function works, and square brackets work, including negative indexes. And so do for loops, the in operator, list, and max, because Python can fall back on getitem with the numbers zero, one, two, and so on until it fails. Defining iter and contains makes these operations more direct, but they are optional here. Operators work the same way. When Python sees a plus b, it calls a dot add of b. The Money class in the second card defines add so that it adds cents. It also checks the type of the other operand, and if it is not Money, it returns NotImplemented, which is a special value, not an exception. That tells Python: I do not know how to do this. Python then tries the other operand's reflected method, and if that fails too, it raises the familiar TypeError, unsupported operand types. So Money plus five fails cleanly. Cooperation has details. Three times a money value needs the reflected multiply method, rmul, because the integer does not know about Money. And the sum function starts from the integer zero, so it would try zero plus Money and fail. You must pass a start value, Money of zero, and then the answer is three cents. Next, controlling attribute access.",
}
