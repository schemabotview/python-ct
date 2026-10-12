import type { Section } from '../types'

// Concept-level only: building, publishing and the command-line entry point are Chapter 11. The pyproject.toml text shown parses with tomllib. The bridge into Chapter 7 is in the narration.
export const projectBoundariesAndReproducibility: Section = {
  id: 'project-boundaries-and-reproducibility',
  title: "Project boundaries, dependency declarations, and reproducible-environment concepts",
  scene: 'project-files',
  focus: 'toml',
  slide: `## Project boundaries and reproducible environments

### Three layers
- **Source**: your packages, such as \`orders/\`
- **Declaration**: \`pyproject.toml\`, what it needs
- **Environment**: \`.venv\`, what is installed; not committed

### Declaring dependencies
- A **range**, \`python-dateutil>=2.9\`, says what is acceptable
- A **pin**, with \`==\`, says the exact version that was tested
- \`requires-python\` says which interpreters it supports

### Reproducing
- Rebuild the environment from the declaration plus pins
- Names differ: \`orders-report\` installs \`orders\`

### Boundaries
- Keep libraries (\`calc\`) apart from programs (\`cli\`)`,
  narration:
    "Now we can describe the reporting project as three separate layers. The first is the source, your own code, here the orders package. The second is the declaration, a file named pyproject dot toml that says what the project is and what it needs. The third is the environment, the dot venv folder holding what is actually installed. The environment is generated, so it is never committed. The layout card shows the files and what each is for. In the second card, the pyproject file declares a distribution name, orders dash report, a version, and the Python versions the project supports. Notice that the distribution name differs from the import name, orders. It also lists dependencies. Here the entry is a range: python dash dateutil, greater than or equal to two point nine. A range says which versions are acceptable, so the project keeps working as new releases appear. A requirements file produced by pip freeze, by contrast, holds pins, written with double equals, an exact version that was tested. Together they let someone else reproduce your environment: create a fresh one, install the declared dependencies, and use the pins when you need exactly the versions you tested with. The deeper point is a boundary. Keep the code that calculates apart from the code that runs as a program, and keep the declaration apart from the installation. How a project is built and published, with a command-line entry point, comes in the last chapter. Modules organise code. Next, we decide when related data and behaviour should form domain objects.",
}
