import type { Section } from '../types'

// The stale-cache failure is the section's main lesson and is shown with its real output. Cache eviction (lru_cache with a maxsize) was verified: with maxsize=2 the third distinct call evicted the first.
export const functoolsWrapsPartialAndCaching: Section = {
  id: 'functools-wraps-partial-and-caching',
  title: "functools: wraps, partial, caching, and their trade-offs",
  scene: 'functools-tools',
  focus: 'wraps',
  slide: `## functools: wraps, partial, and caching

### functools.wraps
- Without it, a decorated function is named \`wrapper\`, with signature \`(*a, **k)\`
- \`@functools.wraps(fn)\` copies the name, docstring and signature

### partial
- \`partial(price_with, 0.5)\` fixes some arguments in advance
- A cleaner alternative to a small lambda

### Caching
- \`@functools.cache\` remembers results by **arguments**
- \`lru_cache(maxsize=N)\` keeps only the most recent N
- Arguments must be **hashable**: a list raises \`TypeError\`

### The trade-off
- Only for **pure** functions: a changed global gives a **stale** answer`,
  narration:
    "The functools module collects the standard tools for working with functions, and three of them matter most here. The first fixes the cost of decorators from the last section. A decorated function is really the wrapper, so its name is wrapper and its signature is just star a and star star k, which breaks help, debugging, and error messages. Placing at functools dot wraps of fn above the wrapper copies the name, the docstring, and the signature from the original, and records the original as the dunder wrapped attribute. Always use it. The second tool is partial. Partial of price with, zero point five, creates a new function with the first argument already filled in, so calling it with ten gives fifteen. It is often cleaner than a small lambda. The third is caching. Putting at functools dot cache on a function makes Python remember each result, keyed by the arguments, so a repeated call returns instantly without recomputing. That is excellent for a slow, repeatable calculation, such as a recursive Fibonacci. The lru cache variant keeps only the most recent results up to a size you choose, evicting the oldest. Cache info reports hits and misses. But caching has two limits, shown in the second card. The arguments must be hashable, so passing a list raises a TypeError, just like a dictionary key. And the function must be pure. Here, with rate reads a global. The first call returns fifteen. We then change the global rate, and the second call still returns fifteen, a stale answer, because the cache never looked at the global. The right answer would be twenty. So cache only functions whose result depends solely on their arguments. Next, describing types without enforcing them.",
}
