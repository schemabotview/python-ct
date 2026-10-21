import type { Section } from '../types'

export const namesAndNamespaces: Section = {
  id: 'names-and-namespaces',
  title: 'Names and namespaces',
  scene: 'names-objects',
  narration:
    "Here is the most important idea in this course, and the one that surprises people coming from other languages. In Python, a variable is not a box that holds a value. It is a name, attached to an object. Look at the second line of the file. Same equals order. It is tempting to read that as copying the list. It does not copy anything. It takes the name same and attaches it to the object that order already refers to. There is still exactly one list. Then the third line appends a third coffee to it through the name same, and the terminal shows the result: printing order shows three items, because order and same are two names for the same list. Python confirms it two ways: same is order is true, and the two identities are equal. The diagram on the right shows the real arrangement. Names live in a namespace, which is simply a dictionary from names to objects; at the top level of a script it is called the global namespace, and every function call gets a fresh one of its own, in its frame. Objects live separately, on the heap, and a name only ever points at one. So assignment never copies. It binds a name. If you actually want a second, independent list, you have to ask for one, with a copy, and you will see how in the course on holding data. Keep this picture in mind whenever a value seems to change behind your back: the question to ask is how many names point at that object. Next, the objects themselves.",
}
