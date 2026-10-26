import type { Section } from '../types'

export const theCallStack: Section = {
  id: 'the-call-stack',
  title: 'Frames and the call stack',
  scene: 'picture-stack',
  narration:
    "Every time a function is called, Python creates a frame for it: a small record holding that call's local variables, and the line it has reached. Frames are kept on the call stack, and orders dot py lets us look at it directly. The last line calls order total with an order of two bags. order total loops over the order and calls line total for each product. And inside line total, before returning, a loop prints every frame on the stack, using the inspect module. The terminal shows three frames, newest first: line total at line seven, order total at line fifteen, and the module itself at line nineteen, where the first call was made. The diagram on the right draws the same three frames. The top one, line total, is running, with its own sku and its own quantity. Below it, order total is paused, waiting for that call to come back. It has its own variables, including total, still zero, and a reference to the order dictionary out on the right. At the bottom is the module's frame, which holds the names defined at the top of the file: the prices dictionary, and the two functions. When line total returns, its frame is removed, popped off the stack, and order total carries on exactly where it paused, adding the result to its total. That is what the table at the bottom summarises. A call pushes a frame, a return pops it, and each frame's variables belong to that call alone, which is why two functions can both use a name like sku without interfering. It also explains tracebacks: when an error is not handled, Python prints this stack. Next, the objects those names refer to.",
}
