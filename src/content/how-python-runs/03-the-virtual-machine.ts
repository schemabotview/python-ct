import type { Section } from '../types'

export const theVirtualMachine: Section = {
  id: 'the-virtual-machine',
  title: 'The virtual machine: a stack machine',
  scene: 'stack-machine',
  narration:
    "Python's virtual machine is a stack machine, and once you see what that means, bytecode stops looking mysterious. Picture a stack of plates. You can put a plate on top, and you can take the top plate off, and that is all. The machine keeps a stack like that for values, and almost every instruction either pushes something onto it, or pops something off it, or both. The table follows the four instructions of our line, step by step. Step one, load name price: Python looks up the name price, finds nine point five, and pushes it. The stack now holds one value. Step two, load name quantity: two goes on top, so the stack holds nine point five and two. Step three, binary op multiply: it pops the top two values, multiplies them, and pushes the single result, nineteen point zero. Step four, store name total: it pops that result and binds the name total to it, leaving the stack empty, exactly as it started. Every expression you will ever write works this way. A longer calculation simply means more loads and more operations, and the order of the instructions is the order Python evaluates your expression in, which is how operator precedence becomes real. There are no registers to manage and no addresses: everything passes through the stack, which is what makes the bytecode so compact and so easy for the interpreter to run. It is also part of why pure Python loops are slower than C: each of these small steps is a separate trip around the evaluation loop. Next, what happens to this stack when one function calls another.",
}
