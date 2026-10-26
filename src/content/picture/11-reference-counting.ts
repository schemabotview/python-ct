import type { Section } from '../types'

export const referenceCounting: Section = {
  id: 'reference-counting',
  title: 'Reference counting and garbage collection',
  scene: 'picture-refs',
  narration:
    'If names refer to objects, something has to decide when an object is no longer needed, and in CPython that is mostly reference counting. Every object keeps a count of the references to it, and the moment that count reaches zero, the object is freed. refs dot py makes a dictionary for one order and asks sys dot getrefcount how many references it has. The answer is two: the name order, and the temporary reference created by passing it to the function itself. The table on the right records that explanation beside each number. Binding a second name, alias, raises the count to three, as the top diagram shows, and deleting alias brings it back to two. Note that del removes a name, not an object. The object only goes away when the last reference does. Reference counting has one blind spot. The second half of the file builds two dictionaries that refer to each other, a cycle, and then deletes both names. Nothing in the program can reach either dictionary any more, but each still holds a reference to the other, so neither count can fall to zero. That is the second diagram. For this, CPython also runs a garbage collector, which periodically looks for groups of objects that nothing else can reach. Calling gc dot collect runs it immediately, and it reports finding two unreachable objects: exactly our two dictionaries. You will rarely call it yourself. But this is why a long running program can hold on to memory you thought was released, and why course eleven measures memory instead of guessing. That completes the picture. Next, we start building the pipeline.',
}
