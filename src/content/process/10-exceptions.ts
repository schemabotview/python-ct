import type { Section } from '../types'

export const exceptions: Section = {
  id: 'exceptions',
  title: 'Exceptions: keeping the run alive',
  scene: 'process-exceptions',
  narration:
    'A new line has arrived that the pipeline cannot price: two bags of B R A five hundred, a Brazilian coffee the shop has just started selling, which is not in our catalogue yet. You saw in course three what looking up a missing key does: it raises a KeyError. Without any help, that error would stop the whole run at this line, and none of the later lines would be priced. The diagram on the right follows the error. It is raised inside price line, when the catalogue lookup fails. price line stops immediately: it never reaches its return, and its frame is removed. The error then travels up to whoever called it, looking for code willing to handle it. That code is the try statement now wrapped around the call in the loop. try says: run this, and if one of these errors happens, run the except block instead. Our except block names the error it expects, KeyError. It prints that the line was skipped, and why, counts it, and continues with the next line. The terminal shows the result in the table below the diagram. The run reaches the end. O R D ten oh six is skipped as an unknown product, the line from the second day is still priced, and the total is the same as before, with two lines skipped. Two habits matter here. Catch only the errors you expect, and catch them where you can actually decide what to do about them. A bare except that swallows every error would also hide a typo in your own code. This version works, but it is still vague: a KeyError could come from anywhere. Next, an error the pipeline owns.',
}
