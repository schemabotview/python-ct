import type { Section } from '../types'

// The failing report is a real run of the discount bug (pct treated as a fraction gave Decimal('-180.00')). unittest is used because it ships with Python; the finding that discover needs tests/ to be a package was a real failure met while verifying and is taught. Learners are not graded or asked to run anything.
export const testingAsAQualityTechnique: Section = {
  id: 'testing-as-a-quality-technique',
  title: "Testing as a program-quality technique: examples, boundaries, isolation, and regression cases",
  scene: 'unit-tests',
  focus: 'tests',
  slide: `## Testing as a quality technique

A **test** runs code on a known input and checks the result.

### What to test
- **Typical** cases, **boundaries** (0, empty), and **failures** (\`assertRaises\`)
- A **regression test** pins a fixed bug

### With unittest
- \`python -m unittest discover -s tests -t .\` runs them
- \`tests/\` needs an \`__init__.py\`, or discovery fails with \`ImportError\`

### Reading a failure
- \`-180.00 != 18.00\` points at the bug

### Isolation
- A temporary folder and \`mock.patch\` keep tests off real files`,
  narration:
    "Until now, we have checked our code by running it and looking at the output. A test automates that. It runs code on a known input and compares the result with what you expect, and it keeps running every time the code changes. The card shows tests for our pricing code written with unittest, which ships with Python. A test class extends TestCase, and every method whose name starts with test is a test. Good tests cover three things. Typical cases, such as three items at four fifty giving thirteen fifty. Boundaries, such as a quantity of zero, or an empty order. And failures, where the right behaviour is to raise an error, which assertRaises checks. The last class is a regression test. A regression is a bug that returns after being fixed, and a regression test pins the correct behaviour so it cannot come back unnoticed. The terminal card shows a real run. The discount function treated a percentage of ten as a fraction, so it computed one minus ten, and the test failed with a report showing Decimal minus one hundred eighty against the expected eighteen. The report points straight at the bug. After we fixed the function to divide by one hundred, all six tests passed and the run ended with OK. One practical lesson from setting this up: test discovery failed with an ImportError until the tests folder contained a file named init, because discovery needs it to be a package. Floating-point results need assert almost equal, because zero point one plus zero point two does not equal zero point three. And tests should be isolated from the outside world. A temporary folder gives each test its own files, and mock dot patch replaces a real dependency with a stand-in. These are annotated examples for you to read, and nothing here asks you to submit or be graded. Next, what to do when a program fails and you do not yet know why.",
}
