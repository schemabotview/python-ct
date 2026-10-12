import type { Section } from '../types'

// The circular-import error is shown exactly as observed on the sandbox Python and the narration says wording varies by version. The two repair strategies are the standard ones: a third module, or importing the module and using it at call time.
export const packagesAndCircularDependencies: Section = {
  id: 'packages-and-circular-dependencies',
  title: "Packages, relative/absolute imports, and circular-dependency symptoms",
  scene: 'package-graph',
  focus: 'graph',
  slide: `## Packages, imports, and circular dependencies

A **package** is a folder of modules, usually with an \`__init__.py\`.

### Importing from a package
- **Absolute**: \`from orders.calc import line_total\`, from the package root
- **Relative**: \`from .calc import line_total\`, beside this module
- Relative imports work only **inside** a package
- \`__init__.py\` runs when the package is first imported

### Circular imports
- A imports B while B imports A
- One runs while the other is half-loaded
- Symptom: \`ImportError: cannot import name ...\`

### Breaking the cycle
- Move the shared code into a **third** module
- Or \`import inventory\` and use \`inventory.in_stock\` later, at call time`,
  narration:
    "As a project grows, even a flat folder of modules gets hard to navigate. A package is a folder of modules that you import as a unit, usually marked by a file named init, with double underscores. Our reporting project is a package called orders, with modules calc, loader, and cli. The diagram is its import graph, where each arrow points from the module doing the importing to the module being imported. Cli uses calc and loader. And a file called main, with double underscores, lets us run the whole package. The init file runs when the package is first imported, and is often empty. There are two ways to write an import inside a package. An absolute import spells the full path from the package root, like from orders dot calc import line total. A relative import uses a dot to mean this package, as in from dot calc import line total, which says the calc module beside me. Relative imports only work inside a package, a point that matters in the next section. Now the classic problem. Suppose pricing imports from inventory, and inventory imports from pricing. Python starts loading pricing, which triggers loading inventory, which asks pricing for a name it has not defined yet, because pricing has not finished loading. The result is an ImportError saying it cannot import that name. The exact wording varies between Python versions, and newer ones may mention a partially initialized module and a likely circular import, but the symptom is the same: an ImportError between two of your own modules that import each other. The fix is to break the cycle. Move the shared code into a third module that both import. Or import the module itself, and look up the name when the function is called, by which time loading has finished. Next, how a module decides whether it is being run or imported.",
}
