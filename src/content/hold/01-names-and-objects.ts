import type { Section } from '../types'

export const namesAndObjects: Section = {
  id: 'names-and-objects',
  title: 'Names and objects',
  scene: 'hold-names',
  narration:
    "Course two ended with a misspelt name. The first change in this course fixes it, and then starts holding the data our pipeline is about: one line of one order. main dot py now gives three things names. sku is the product code, a piece of text. price is nine point nine five, and quantity is three. The last line prints all three with the line's total, and the terminal shows the familiar long number, which we fix in the next section. The table at the bottom of the right hand pane lists those names, what each refers to, and the type of that object: a string, a float and an integer. You met the key idea in course one: a name refers to an object, and assignment binds a name; it never copies. The REPL makes it concrete. We set quantity to three, then write bags equals quantity. The top diagram shows the result: two names, one object, the integer three. Then quantity equals quantity plus one. Python evaluates the right hand side first, making a new integer, four, and then moves the name quantity to it. The second diagram shows what changed: only quantity's arrow moved. bags still refers to the three, and asking for both confirms it: four, and three. Integers cannot be changed in place; arithmetic always produces a new object, and the name is simply moved to point at it. This is why reassigning one name never affects another, and it is the first half of a lesson that pays off at the end of this course, when the objects can be changed. Next, why the price is the wrong kind of number.",
}
