import type { Section } from '../types'

// Introduced by purpose, not catalogued, as the plan requires. Output of statistics.__all__ is used rather than dir() because dir() also lists names the module merely imported.
export const discoveringTheStandardLibrary: Section = {
  id: 'discovering-the-standard-library',
  title: "Discovering and reusing the standard library",
  scene: 'stdlib-tour',
  focus: 'explore',
  slide: `## Discovering and reusing the standard library

The **standard library** ships with Python: nothing to install.

### Find by purpose
- Data: \`csv\`, \`json\` · Paths: \`pathlib\`, \`shutil\`
- Time: \`datetime\`, \`zoneinfo\` · Numbers: \`decimal\`, \`statistics\`
- Collections: \`collections\`, \`itertools\` · Text: \`re\`, \`textwrap\`

### Explore from the prompt
- \`help(statistics.median)\` shows the documentation
- \`module.__all__\` lists a module's public names

### Prefer it
- Tested, documented, and present on every installation
- Add third-party packages only when needed

### Not found?
- \`ModuleNotFoundError\`: not installed here, or the name differs`,
  narration:
    "You already use the standard library: csv, json, pathlib, decimal, and datetime all came with Python. It is large, and you will never memorise it, so what matters is knowing how to find the right module. Start from the problem. The table groups modules by purpose. For data files, look at csv and json. For paths and copying files, pathlib and shutil. For dates and time zones, datetime and zoneinfo. For exact or statistical arithmetic, decimal and statistics. For counting and combining things, collections and itertools. And for matching and wrapping text, re and textwrap. Then explore from the prompt. In the code card, the statistics module gives us the mean of our three prices, four point nine one six six and so on, and the median, four point five. The built-in help function shows a function's documentation, and a module's double-underscore all list names its public functions and classes. Counter, from collections, counts items, so counting our order items, tea appears twice. Why prefer the standard library? It is tested, documented, and present on every installation, so your program runs anywhere Python does, without anything extra to install. Reach for a third-party package only when the standard one falls short. If an import fails with ModuleNotFoundError, either the package is not installed in this environment, or the name you used is not the name it is imported under, which is the subject of the next section. And remember last section's warning: a file of your own named like a standard module will hide it. Next, installing code that does not come with Python.",
}
