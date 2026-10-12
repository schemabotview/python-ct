import type { Section } from '../types'

// The two traps taught explicitly are the ones that bite in practice: a bare name in a case captures rather than compares, and a guard can raise on the wrong type. Matching is a Python 3.10+ feature.
export const structuralPatternMatching: Section = {
  id: 'structural-pattern-matching',
  title: "Structural pattern matching and its distinction from ordinary comparisons",
  scene: 'match-order',
  focus: 'match',
  slide: `## Structural pattern matching

\`match\` compares a value's **shape** against patterns, top to bottom. It arrived in Python 3.10.

### The shape
- Patterns can be literals, sequences or dictionaries
- The first matching case runs; \`_\` matches anything
- A name in a pattern **captures** the value: \`{"item": other}\`

### Not a comparison
- \`case tea:\` captures **anything** into \`tea\`; it does not compare to a variable
- A literal compares: \`case "tea":\`
- \`0 | 1\` matches either; \`if\` adds a guard

### Take care
- A guard can fail on the wrong type: check it first, as in \`case int() if v > 100\`
- Use \`if\`/\`elif\` for plain comparisons; use \`match\` for shapes`,
  narration:
    "So far, decisions have compared values. Structural pattern matching, added in Python three point ten, does something different: it compares the shape of a value. The code card matches an order, which is a dictionary. Python tries each case from the top and runs the first one that fits. The first pattern requires the item to be tea and the quantity to be exactly zero, and our order does not fit. The second requires tea and any quantity, and it does fit, and notice what happens to the name q: it captures the value three, so we can use it in the body, and status becomes three tea. The third case would match any order with an item, and the underscore case matches anything at all, as a final fallback. The table lists the pattern kinds. A literal like the text tea matches that exact value. A bare name matches anything and binds it. The underscore matches anything and binds nothing. A tuple pattern matches a sequence of that shape, and a dictionary pattern matches any dictionary with those keys. This is where match differs from ordinary comparison, and it has two traps. First, a bare name in a case does not compare against a variable. Writing case tea would capture whatever was passed into a new name tea, matching everything. Only literals compare. Second, you can add a guard with if, and you can combine alternatives with a bar, but a guard runs on whatever matched, so a guard comparing greater than one hundred would raise a TypeError on text. Check the type first. For plain comparisons, if and elif remain the right tool.",
}
