import type { Section } from '../types'

// A short CSV row yielding None rather than a KeyError was found while verifying this chapter, and is taught explicitly because the natural except KeyError would miss it.
export const validationAndRecoveryPolicies: Section = {
  id: 'validation-and-recovery-policies',
  title: "Validation, malformed records, missing fields, and recovery policies",
  scene: 'validation',
  focus: 'check',
  slide: `## Validation and recovery policies

### Validate at the boundary
- Check types, ranges and required fields as data **enters**
- A short CSV row gives \`None\` for the missing field, **not** a \`KeyError\`
- An empty cell is \`""\`, which is not the same as missing

### Check more than the type
- \`" 3 "\` has spaces: \`.strip()\` before checking
- \`isdigit()\` rejects \`"-3"\` and \`"2.5"\`; a quantity of \`0\` parses but makes no sense

### Report every problem
- Return a **list** of problems, not just the first one
- Messages should name the field

### Choose a policy
- Decide **before** the data arrives; the table lists the usual four
- Whatever you choose, **count** what you skipped`,
  narration:
    "Data you did not write cannot be trusted, so you check it as it enters your program. The sample has three rows, each in a different state. The first is fine. The second has the text x as a quantity. And the third has a price of None, and this one deserves attention. When a CSV row has fewer values than the header has columns, the reader does not leave the key out. It fills the missing value with None. So catching a KeyError, which is the natural thing to do for a missing field, would miss it completely, and the None would travel on until some later calculation fails. Likewise, an empty cell is an empty string, which is a different thing from a missing value. The validator function in the card returns a list of every problem it finds in a row, not just the first, so a person fixing the file can correct everything in one pass. The messages name the field. Applied to the three rows, it gives an empty list for the good row, a quantity message for the second, and a price message for the third. Check more than the type: strip stray spaces first, remember that isdigit rejects negative and decimal text, and a quantity of zero may parse but still make no sense. Having found a problem, you must decide what to do, and the table lists four policies. You can stop at the first error, which suits situations where money must be right. You can skip the bad row and report it, which suits bulk imports, though someone has to read the report. You can substitute a default, which suits optional fields but can hide real gaps. And you can repair the value, which is only safe when the rule is certain. Decide the policy before the data arrives, and whichever you choose, count what you skipped. Next, two tricky kinds of values: time and money.",
}
