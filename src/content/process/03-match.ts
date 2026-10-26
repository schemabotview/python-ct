import type { Section } from '../types'

export const match: Section = {
  id: 'match',
  title: 'match: dispatching on the shape of a row',
  scene: 'process-match',
  narration:
    "Real data is messy, and the first messy line has arrived. The shop's system sent a fifth order, O R D ten oh five, whose quantity is not a number but the word three, typed into the field by hand. Before the pipeline can price a line, it has to ask what shape the line is, and Python's match statement is built for exactly that question. match takes a value and compares it against a series of patterns, in order, until one fits. The first pattern here describes a good line: a dictionary with a sku and a quantity, where the quantity is an integer, followed by a guard, if quantity is greater than zero. When a pattern matches, it also binds names to the parts it found, so sku and quantity are ready to use inside that case. The second pattern only asks for a quantity, of any kind. The diagram on the right follows our bad line through the cases. The first pattern fails, because the text three is a string, not an integer. Python moves on to the second case, which matches, and binds the name qty to the word three, so the program can say exactly what was wrong. The terminal shows it: cannot price O R D ten oh five, quantity three. The table at the bottom shows how to read the pieces of a pattern. Curly braces match a dictionary with those keys, int in a pattern checks the type, and if adds an extra condition. And case underscore, which we will use soon, matches anything at all. Notice what did not happen here: no crash, and no wrong price. So far, though, we have only checked one line. Next, every line of the day.",
}
