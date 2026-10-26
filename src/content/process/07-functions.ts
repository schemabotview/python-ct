import type { Section } from '../types'

export const functions: Section = {
  id: 'functions',
  title: 'Functions: price_line()',
  scene: 'process-functions',
  narration:
    "The pricing rules now sit in the middle of a loop, where nothing else can use them and nobody can test them on their own. A function fixes both problems: it gives a step a name. main dot py now defines two. discount rate takes a quantity and a subtotal, and returns the rate, with the same rules as before, written as returns. The docstring under its first line says what it does, in plain words. price line takes a product and a quantity, computes the subtotal, asks discount rate for the rate, and returns the line's total, rounded to the cent. The loop has shrunk to a single call: total equals price line of sku and quantity. The output has not changed at all, which is exactly what a good refactoring should look like. What changed is the shape. Each call creates a frame, as you saw in course one. The diagram on the right freezes the stack while discount rate is running for the twelve bag line. Its frame is on top, with its own quantity and subtotal. Under it, price line's frame is paused, waiting, and under that, the module's loop. When discount rate returns nought point one five, its frame is popped, and price line carries on; when price line returns one hundred seventy eight fifty, the loop carries on. And now the pricing can be tried on its own. In the REPL, after the script has run, calling price line with Colombian and twelve gives one hundred seventy eight fifty, without touching the orders at all. Testing a function by calling it directly is the seed of course ten. Next, the ways values get into a function.",
}
