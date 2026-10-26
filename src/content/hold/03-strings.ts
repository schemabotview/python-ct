import type { Section } from '../types'

export const strings: Section = {
  id: 'strings',
  title: 'Strings: SKUs, indexing and slicing',
  scene: 'hold-strings',
  narration:
    "Our product codes carry information. E T H dash two fifty means Ethiopian coffee in a two hundred and fifty gram bag, and the pipeline will need both halves. A string is a sequence of characters, and the table at the top of the right hand pane lays out the seven characters of this one, with their positions. Positions start at zero, so the E is at index zero. They can also be counted from the end, using negative numbers, so the final zero is at index minus one. Slicing takes a run of characters: a start, a colon, and an end, where the end itself is not included. So sku, from the start up to three, is E T H, and sku from four onwards is the digits, two five zero. In the REPL, the last three characters, minus three onwards, give the same digits. The split method breaks a string wherever it finds the separator you give it, and returns a list of the pieces, one for the origin and one for the size. Notice the quotes in the answers. Two five zero, sliced out of a string, is still a string, text that looks like a number. Python will not do arithmetic with it, and will not guess. The diagram below the tables makes that conversion explicit: the int function turns the text into the integer two hundred and fifty. main dot py now does exactly that, and the terminal prints the product's origin and its weight in grams. One more thing to know: strings cannot be changed. Every slice, and every method that seems to modify one, returns a new string. Next, values that answer yes or no, and values that might be missing.",
}
