import type { Section } from '../types'

export const aValueObject: Section = {
  id: 'a-value-object',
  title: 'A value object: Money',
  scene: 'model-money',
  narration:
    "Money has been Decimal since course four, which keeps it exact. But a Decimal does not know it is money. Nothing stops adding a price to a quantity, or storing an amount with five decimal places. A value object is a small class that wraps a value and knows its rules. Money is a frozen dataclass with one field, the amount. Frozen means its fields cannot be changed after it is made. Trying to assign a new amount raises a FrozenInstanceError. A Money is a value, like the number five: you never change it, you make a new one. That is exactly what the two methods do. Plus, written as dunder add, takes another Money and returns a new Money holding the sum. Times, dunder mul, multiplies by a quantity or a rate, and rounds to the cent, so the rounding rule lives inside the type now. Equality, hashing and the repr come from the frozen dataclass itself. The REPL shows all of it. a is nine ninety five, b is seventeen fifty. a plus b is a new Money of twenty seven forty five, a times three is twenty nine eighty five, and a itself is unchanged. The diagram on the right draws that: two names, two objects, and a third object that the addition made, with no name of its own. Two Money values with the same amount are equal, and because they hash the same, a set holding both keeps only one. Products now cost Money, line totals are Money, and summarise adds Money together. The summary prints, writes and loads exactly as before, because Money's str is just its amount. Next, a class that holds many objects.",
}
