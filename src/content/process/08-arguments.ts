import type { Section } from '../types'

export const argumentsSection: Section = {
  id: 'arguments',
  title: 'Arguments, and the mutable default trap',
  scene: 'process-arguments',
  narration:
    "A function is only as useful as the ways you can call it. price line now takes a third parameter, catalogue, with a default value: CATALOGUE. A call that leaves it out gets the shop's real prices, exactly as before. A call that passes a different catalogue, for example a test with made up prices, gets those instead, and the function body now uses whichever catalogue it was given. The table in the middle of the right hand pane shows the three ways arguments arrive. By position, matched in order. By keyword, where you name the parameter, which makes long calls far easier to read. And by default, when the caller leaves it out. Defaults have one famous trap, and the REPL walks straight into it. add reason takes a reason, and a list to add it to, which defaults to an empty list. Call it once with bad quantity, and you get a list holding bad quantity. Call it again with unknown product, and you would expect a fresh list holding just that. Instead you get both reasons. The diagram at the top shows why. A default value is created once, when the def statement runs, and stored on the function. Every call that relies on the default receives that same list, so each call adds to what the previous ones left behind. For numbers and strings, which cannot change, that never matters. For a list or a dictionary, it causes bugs that appear only on the second call. The fix, shown at the bottom, is to default to None and create a new list inside the function. Our catalogue default is safe, because a frozendict can never change. Next, where Python looks names up.",
}
