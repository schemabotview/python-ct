import type { Section } from '../types'

export const propertiesAndInvariants: Section = {
  id: 'properties-and-invariants',
  title: 'Properties and invariants',
  scene: 'model-properties',
  narration:
    "An invariant is something that must be true of every object of a class, for its whole life. For a LineItem, one is obvious: nobody buys zero bags, or minus one. Until now that rule lived in parse row, as a check on the text. But a LineItem can be built anywhere, by a test or by a later course, so the rule belongs to the class itself. A dataclass lets you add a method called post init, which Python calls right after the generated init has set the fields. LineItem's post init checks the quantity, and if it is below one, raises a ValueError that says so. The REPL tries it: a line of zero bags is refused, and the traceback shows the path, from the call, through the generated init, into post init, and the message, quantity must be one or more, got zero. The flow on the right draws the same thing: every new LineItem passes through post init, and comes out either as a valid line, or as an error. parse row keeps the check that the quantity is made of digits, because text is its job, and it now catches the ValueError and turns it into InvalidOrder, so the rule is stated in one place only. The second change is smaller but just as useful. subtotal and total are now properties. The property decorator turns a method into something you read like an attribute, without parentheses. line dot total looks like data, but it is computed fresh each time from the product, the quantity and the discount. Nothing can fall out of step, because nothing is stored twice. Next, the money itself becomes an object.",
}
