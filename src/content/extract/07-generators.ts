import type { Section } from '../types'

export const generators: Section = {
  id: 'generators',
  title: 'Generators: streaming a month',
  scene: 'extract-generators',
  narration:
    "The shop has now sent the whole of October: thirty one files. Building a dictionary of every day's rows before pricing any of them works for a month, but the same code would need memory for a year, or ten, all at once. A generator avoids that. main dot py replaces read day with iter rows, a function that contains the keyword yield. Calling a function like that does not run it. It returns a generator, an object that produces values one at a time, on request. Each time the loop asks for the next row, iter rows runs until it reaches a yield, hands that row over, and pauses right there, with all of its local variables intact, until it is asked again. Here, yield from passes along every row the csv reader produces, file by file. The diagram at the top of the pane freezes that pause. The REPL makes it concrete: calling iter rows gives us rows, and asking for next of rows twice gives the first two orders of the month, ten oh one and ten oh two. Nothing else has been read yet. The main loop now prices rows as they stream past, keeping only running totals: thirty one files, one hundred sixty three lines priced, thirteen rejected, and an October total of eleven thousand, five hundred seventy eight, and eighty eight cents. The table at the bottom compares the two approaches: a list holds every row before the first is used, while the generator holds one file at a time and hands out one row at a time. That completes reading the data. In the next course, we stop just adding it up, and start asking it questions.",
}
