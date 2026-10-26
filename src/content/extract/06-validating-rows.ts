import type { Section } from '../types'

export const validatingRows: Section = {
  id: 'validating-rows',
  title: 'Validating rows: keep the good, report the bad',
  scene: 'extract-validating',
  narration:
    "Real files contain real mistakes, and the shop has sent three more on the third day: a line with no customer, a quantity of minus one, and a short line that stops before its quantity. Until now, the only checks lived in price line, mixed in with the pricing. main dot py now separates the two jobs. A new function, parse row, takes a raw CSV row, where every value is still text, and either returns a clean order line, with its quantity converted to an integer, or raises InvalidOrder saying exactly what is wrong. price line goes back to doing one thing: pricing a line it can trust. The table at the top of the right hand pane shows parse row's verdict on every row of the third day. The four good rows pass. Order ten thirteen has no customer. Order ten fourteen's quantity, minus one, is not a whole number above zero. And order ten fifteen is short, so its quantity is missing entirely. Notice how parse row tells two kinds of missing apart, using the sentinel from course three, called MISSING. Asking a row for a field that its file has no column for returns MISSING, which means the whole file is wrong. A row that simply left the field empty gives None or an empty string. The table at the bottom shows the difference. The terminal shows the result: four rejections, each with its reason, and every good row still priced. This is the pipeline's contract from now on. Every row that comes in is either priced or reported, and nothing is ever dropped silently. Next, the whole month of files, and a way to read it without holding it all at once.",
}
