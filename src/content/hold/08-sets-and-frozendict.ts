import type { Section } from '../types'

export const setsAndFrozendict: Section = {
  id: 'sets-and-frozendict',
  title: 'Sets, and a catalogue that cannot change',
  scene: 'hold-sets',
  narration:
    'Two more collections round out what the pipeline needs to hold. The first is the set. A set holds each value at most once, and it has no order. In the REPL, a set written with four customer names, Maya twice, has a length of three: the duplicate simply disappears. The diagram at the top shows four names going in and three coming out. That makes sets the natural answer to questions like how many different customers ordered today, which our report will ask in course six. Sets have a second strength, shown in the middle table: checking whether something is in them. To check membership in a list, Python compares each item in turn, so the time grows with the length of the list. A set uses hashing, like a dictionary, so it looks in one place, and the check takes about the same time however large the set grows. Course eleven measures that difference. The second change is to the catalogue. Our prices are a constant: nothing in the pipeline should ever change one while it runs. Until now, that was only a convention, signalled by capital letters. Python three point fifteen adds frozendict, a dictionary that cannot be changed after it is created. main dot py now wraps the catalogue in it. Everything that reads a dictionary works exactly as before, as the terminal shows. But in the REPL, trying to set a price raises a TypeError: a frozendict does not support item assignment. A rule that was only a convention is now enforced by Python itself, which is the safest kind of rule. Next, structures inside structures, and what copying really copies.',
}
