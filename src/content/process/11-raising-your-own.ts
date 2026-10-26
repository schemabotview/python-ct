import type { Section } from '../types'

export const raisingYourOwn: Section = {
  id: 'raising-your-own',
  title: 'Raising your own: InvalidOrder',
  scene: 'process-raising',
  narration:
    "The pipeline now rejects lines for two different reasons, in two different places: a bad quantity in the loop, and an unknown product inside price line. The last step of this course brings both together, under an error of our own. A new class, InvalidOrder, is defined near the top of the file. It inherits from Exception, Python's base class for errors, and its docstring says what it means: a line the pipeline refuses to price, and why. We will look at classes properly in course nine; for now, two lines are all an exception class needs. price line now does its own checking. The match statement has moved inside it, and when the quantity is wrong, it raises InvalidOrder, with a message naming the line and the bad value. When the product is unknown, it raises InvalidOrder again, naming the product, instead of letting a KeyError escape. The loop is now simple. It tries to price each line. If that raises InvalidOrder, it keeps the error in a list called rejected and moves on. The diagram on the right shows the two ways out of price line. At the end, the program prints the total, the number of rejected lines, and then every rejection with its reason, as the table shows: the quantity three, and the unknown product B R A five hundred. This is the principle the whole pipeline will follow. A clear error is better than a wrong answer, and the run must never stop silently, or carry on silently either. Every line is either priced or reported. That completes processing the data. In the next course, the orders stop being typed into the program, and are read from real files.",
}
