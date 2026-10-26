import type { Section } from '../types'

export const scope: Section = {
  id: 'scope',
  title: 'Scope: where a name is found',
  scene: 'process-scope',
  narration:
    'Rounding to the cent appears in more than one place, so main dot py gives it a function of its own: to cents, which quantizes an amount using CENT. price line now calls it. The output is unchanged. But look at what to cents does: it uses CENT without being given it. So where does that name come from? Python looks names up in a fixed order, often called L E G B, and the diagram on the right walks through it for CENT. First, the local scope: the names created inside this call of to cents, which is just its parameter, amount. No CENT there. Next, any enclosing function: to cents is not inside another function, so there is none. Next, the global scope: the names defined at the top level of main dot py. CENT is found there, and the search stops. Only if it had failed there would Python look in the built ins, the names like print and sum that every program starts with, and only after that would it raise a NameError. Reading a name searches outwards like this. Assigning a name is different, and the REPL shows how. We set rate to the word global. Then we define a function, show, which assigns rate to the word local and returns it. Calling it, and then asking for rate, gives local, and global. The assignment inside the function created a new, local name, and left the global one alone. That is deliberate: a function cannot accidentally overwrite the names around it. Python does have keywords to rebind an outer name, global and nonlocal, but needing them is usually a sign the code should pass values in and return them instead. Next, what happens when something goes wrong.',
}
