import type { Section } from '../types'

// The build, install, run and uninstall were really performed in a throwaway directory and fresh venv with no network use or publishing. The system's distribution-patched setuptools failed on this Python (AttributeError: install_layout), so a clean setuptools was installed into a scratch venv; that detail is stated rather than hidden. Requires-python is >=3.10 because that is what was verified; the course baseline is 3.14. Publishing is not covered.
export const integratedWalkthroughAndPackaging: Section = {
  id: 'integrated-walkthrough-and-packaging',
  title: "Integrated walkthrough: organise, validate, diagnose, and package the reporting tool",
  scene: 'package-flow',
  focus: 'declaration',
  slide: `## Walkthrough: package the reporting tool

### The path through the course
- **Organise**: modules and a package (Chapter 6)
- **Validate**: reject bad rows, exact \`Decimal\` money (Chapter 5)
- **Diagnose and test**: unit tests, logging, profiling
- **Interface**: \`argparse\` and an exit status

### Packaging
- \`pyproject.toml\` declares the **build system**, the project, and an **entry point**
- \`[project.scripts]\` creates the \`orders-report\` command
- A build makes a **wheel** (ready to install) and an **sdist** (source)

### Installing, locally
- Install into a **fresh virtual environment**
- The command runs, and uninstalling **removes** it
- **Verified:** built, installed, ran, uninstalled
`,
  narration:
    "Now we bring the whole course together on the reporting tool. In Chapter 6, we organised the code into a package. In Chapter 5, we validated rows and used exact decimal money. In this chapter, we added tests, logging, an understanding of performance, safe handling of untrusted input, and a command-line interface. The last step is packaging, so that someone else can install the tool and run a command. The top card is a pyproject dot toml file, like the declaration from Chapter 6, now with three additions. A build system section says which tool builds the project, here setuptools. The project section names it, gives a version, and states the oldest Python it supports, here three point ten, which is the version I verified against and not the Python used to write it. And a project scripts section maps the command name orders dash report to the function main in the cli module, which tells installers to create that command. The terminal card is an illustration of a local run that I actually performed in a throwaway folder. Building produced a wheel, a ready-to-install file, and also a source distribution. I installed the wheel into a fresh virtual environment. The installed command ran, printing that it would read the file with a tax of zero point two, and exited with status zero, and importing the package reported version zero point one point zero. Uninstalling removed the command again. One honest detail: the first build failed, because the older setuptools packaged with this system was not compatible with its Python, so I installed a current setuptools into a scratch environment, which is an environment problem and not a flaw in the project. Publishing the package, and deploying it to servers, are outside this course. You can now read, organise, test, diagnose, and package a Python program. Continue with unfamiliar programs and domain-specific libraries, because deeper practical competence grows through separate implementation experience and feedback.",
}
