import type { Section } from '../types'

export const booleansNoneSentinels: Section = {
  id: 'booleans-none-sentinels',
  title: 'Booleans, None and sentinels',
  scene: 'hold-none',
  narration:
    "Some values answer a question, and some values are missing, and the pipeline has to handle both without confusing them. A comparison produces a boolean, one of two values, True or False. main dot py asks whether the quantity is ten or more, the shop's rule for a wholesale order. Three is not, so the comparison gives False, and the diagram at the top shows the name is wholesale keeping that answer. The discount code is a different problem, because it might not exist. Python's built in way to say there is no value is None. Our first line's customer used no code, so discount code is None, and the terminal prints it. The table in the middle shows why this needs care. A code can be a string, a real code that was entered. It can be None, meaning the customer had no code. And sometimes there is a third state: nobody told us at all, because the field was not in the data. If you use None for that as well, the two meanings collide. Python three point fifteen adds a tool for exactly this, the sentinel. In the REPL, we create one called NOT GIVEN. It is a unique object with a name, and it is not None. And here is a subtlety the REPL exposes: None counts as false, but the sentinel counts as true. That is why you should test for these values by identity, with is None or is NOT GIVEN, rather than by truthiness, because an empty string and zero are false too, and they are perfectly good values. The table at the bottom summarises the sentinel. We will use one in course five, when rows arrive with fields missing. Next, many order lines at once.",
}
