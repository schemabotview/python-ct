import type { Section } from '../types'

export const namesAndObjects: Section = {
  id: 'names-and-objects',
  title: 'Names, objects and the heap',
  scene: 'picture-heap',
  narration:
    "In Python, a variable is not a box that holds a value. It is a name that refers to an object, and getting this right early prevents a whole family of bugs later. identity dot py makes a list of two product codes and binds it to the name a. The next line, b equals a, does not copy anything. It binds a second name to the same object, which is what the top diagram on the right shows: two names, one arrow each, one list. The third line builds a new list with the same two codes, and binds it to c. That is a separate object that happens to hold equal values, shown in the second diagram. Every object has three things: an identity, a type and a value. The id function returns the identity, which in CPython is the object's address in memory. The terminal shows that a and b have the same id, and c has a different one. Your numbers will differ on every run, but that pattern will not. Python gives you two ways to compare. The is operator asks whether two names refer to the very same object, so a is b is true, and a is c is false. The double equals operator asks whether the values are equal, so a equals c is true as well. The first table below the diagrams puts those answers side by side, and the next one lists the three things that list has. In everyday code you almost always want double equals; is is for checking identity, most often against None. Remember b equals a. When we start changing lists and dictionaries in course three, a change made through one name will show up through the other. Next, how objects disappear.",
}
