import type { Section } from '../types'

export const theVirtualMachine: Section = {
  id: 'the-virtual-machine',
  title: 'The virtual machine',
  scene: 'picture-vm',
  narration:
    "Python's virtual machine is a stack machine, and once you can picture the stack, bytecode stops being mysterious. Here line total takes a discount as well: price times quantity, minus the discount. Called with ten, three and two, the terminal shows it returns twenty eight. The second command prints its bytecode, and the diagram on the right follows the value stack through every instruction, with the top of the stack first. The first instruction loads two arguments, price and quantity, and pushes them, so the stack holds ten, with three on top. Binary op, multiply, takes the top two values off the stack, multiplies them, and pushes the result: now there is only thirty. The next instruction pushes the discount, two, on top of the thirty. Binary op, subtract, takes those two values off again, computes thirty minus two, and pushes twenty eight. Finally return value takes the top of the stack and gives it back to whoever called the function. That is the whole model. Every instruction takes its operands from the top of the stack and leaves its result there. There are no named registers to keep track of, which is part of what makes the compiler simple, and the machine portable. It also explains the speed difference from a few sections ago. Adding a million numbers in a Python loop means running instructions like these millions of times, each one checking what kind of objects it has been given before it can do any arithmetic. Calling sum runs one loop written in C. So far, our functions have run on their own. Next, what happens when one function calls another.",
}
