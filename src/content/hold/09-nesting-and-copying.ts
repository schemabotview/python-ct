import type { Section } from '../types'

export const nestingAndCopying: Section = {
  id: 'nesting-and-copying',
  title: 'Nesting, aliasing and copying',
  scene: 'hold-nesting',
  narration:
    "Real data nests: lists of dictionaries, dictionaries of lists. main dot py now keeps the day's orders under its date, in a dictionary called DAYS, ready for the month of files we will read in course five. But there is a question hiding in that line, and it is the most important idea in this course: does DAYS hold a copy of the orders, or the orders themselves? Remember course one: a container stores references to objects, not copies of them. So DAYS at the first of October refers to the very same list as ORDERS. The REPL proves it, and shows what copying really does. First we make two copies of the order list. copy dot copy makes a shallow copy: a new list, whose slots refer to the same order dictionaries. copy dot deepcopy makes a deep copy: a new list, and new dictionaries inside it, all the way down. Then we change the first order's quantity to four, through ORDERS. Look at the answers. Through DAYS, the quantity is four, because DAYS holds the same list. Through the shallow copy, it is also four. The list is new, but its first slot still refers to the same dictionary we just changed. That is the top diagram. Only the deep copy still says three, because it has its own dictionaries, as the second diagram shows. This is behind a whole family of bugs, where data changes somewhere the code never touched it. The rule of thumb is to change data in one clearly owned place, and copy deliberately when you need independence. That completes holding the data: numbers, text, missing values, and four kinds of collection. In the next course, we start processing it.",
}
