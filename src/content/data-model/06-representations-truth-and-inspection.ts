import type { Section } from '../types'

// The fallback chain is the point: str falls back to repr, bool falls back to len. Both were verified on small classes. Eval(repr(x)) is deliberately not recommended, only noted as the aim of a good repr.
export const representationsTruthAndInspection: Section = {
  id: 'representations-truth-and-inspection',
  title: "Readable representations, truth testing, and object inspection",
  scene: 'repr-truth',
  focus: 'methods',
  slide: `## Representations, truth, and inspection

### Two representations
- \`__repr__\` is for **programmers**: aim to look like the constructor call
- \`__str__\` is for **users**; it falls back to \`__repr__\`
- \`print\` and f-strings use \`str\`; containers and the prompt use \`repr\`

### Truth testing
- \`bool(x)\` tries \`__bool__\`, then \`__len__\`, then is \`True\`
- An empty container is false because its \`__len__\` is 0

### Inspection
- \`dir(x)\` and \`vars(x)\` list attributes; \`type(x)\` gives the class
- \`hasattr\`, \`getattr(x, "n", default)\`, \`callable\`

### Habit
- Always write \`__repr__\`: debugging and logs become readable`,
  narration:
    "An object can present itself in two ways, and Python gives you a special method for each. The repr method is for programmers. It should be unambiguous, and ideally look like the code that would recreate the object, such as LineItem of tea, three, four point five. The str method is for end users, and it can be friendlier, like three times tea. If you define only repr, str falls back to it, but not the other way round. Which one is used where? Print, str, and f-strings use str. The interactive prompt, the repr function, and anything displayed inside a container use repr. The card shows it: asking for the list that holds our line item displays the repr, because a list shows its items by repr. Another special method controls truth testing. When you write if x, or call bool, Python first tries the bool method. If there is none, it tries len, and a length of zero means false. If neither exists, the object is true. That explains why empty containers are false, and why our line item with a quantity of zero can be made false by defining bool. Python also gives you tools to inspect any object. Dir lists its attribute names, vars shows the instance dictionary, type gives its class, and hasattr, getattr with a default, and callable ask questions about it. A good habit is to always write a repr, because it makes debugging, logging, and error messages readable, instead of showing an unhelpful object at some memory address. Next, making our own classes behave like built-in ones.",
}
