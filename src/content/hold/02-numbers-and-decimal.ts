import type { Section } from '../types'

export const numbersAndDecimal: Section = {
  id: 'numbers-and-decimal',
  title: 'Numbers, and why money is a Decimal',
  scene: 'hold-decimal',
  narration:
    "Python has more than one kind of number, and the pipeline has to pick the right one for money. In the REPL, zero point one plus zero point two gives zero point three, followed by a long run of zeros and a four. That is not a Python bug; every language that uses binary floating point gives the same answer, because zero point one has no exact binary form, just like a third has no exact decimal form. For measurements that is fine. For money it is not: an invoice cannot be wrong by a fraction of a cent, and small errors grow when you add thousands of them. The standard library's answer is the decimal module. A Decimal stores decimal digits exactly, so Decimal of zero point one plus Decimal of zero point two is exactly zero point three. There is one trap, and the REPL shows it. Decimal of nine point nine five, written without quotes, is built from a float, and the float's error comes with it, kept exactly, all fifty digits of it. The diagram in the middle of the pane draws the rule: make a Decimal from text, never from a float. The text nine point nine five, exactly as the shop wrote it, becomes exactly nine point nine five. So main dot py now imports Decimal, the price is created from a string, and the terminal shows three bags costing twenty nine point eight five, to the cent. The table at the bottom sums up the three kinds of number this course uses: integers for quantities, floats for measurements, and Decimal for every amount of money, from here to the end. Next, the product code, which is text.",
}
