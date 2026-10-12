# Python — From Programming Foundations to Advanced Application

## Audience and prerequisites

For beginners with basic computer literacy and no prior programming knowledge. Explain programming terms before using them. Annotated Python code, expected outputs, diagrams, and worked failure cases connect concepts with application. Learners may run examples, but installation, submitted exercises, assessments, and monitoring are not required.

Reference baseline: **Python 3.14**. Distinguish language guarantees from CPython implementation behaviour and distinguish GIL-enabled from free-threaded builds. This fixed baseline is not a claim about the newest release.

Scope: core programming, Python data structures and object behaviour, files, reusable code, advanced language protocols, concurrency, and program-quality/distribution concepts. The standard library is introduced by purpose rather than exhaustively catalogued.

Target: understand how to construct and organise Python programs, interpret their execution and results, diagnose common failures, and justify abstraction and execution choices. The course does not claim to verify individual mastery.

Structure: **11 chapters**, with **6, 9, 7, 9, 10, 6, 8, 9, 6, 8, and 8 sections**. Scope determines counts; sections need not have equal duration.

## Learning spine

Trace a small program → choose and transform data → control execution → compose functions → handle files and failures → organise modules → model objects → use Python protocols → compose advanced functions → choose concurrency → reason about quality and distribution.

Recurring example: an order-processing/reporting tool starts with an order-total calculation, then gains collections, validation, reusable functions, structured file input, modules, domain objects, lazy processing, concurrent work, and a packaged command-line interface. Small contrasting examples expose misconceptions that the main example may not reveal.

Teaching method: objective → mental model → annotated code and expected result → failure/alternative contrast → explanation summary → bridge. Use reference diagrams, call stacks, generator traces, and execution timelines where useful. Advanced syntax is explained before it is relied on. Comprehensions and sort keys receive brief previews followed by explicit treatment of their dependencies; validation and diagnosis begin before the dedicated quality chapter.

## Chapter 1 — Programs, Values, and Execution

Objective: Build a mental model of a program and trace a small calculation.

1. Programs, algorithms, source code, and the interpreter
2. Interactive sessions versus scripts: a first execution walkthrough
3. Names, assignment, objects, and basic scalar types
4. Expressions, operators, conversion, and numeric representation
5. Text input, formatted output, and simple interaction
6. Syntax errors, runtime errors, and reading a short traceback

Worked illustrations: Annotated order-total code with input and output; a name-to-object diagram; integer versus floating-point calculations; a malformed-input traceback. Introduce the programming vocabulary before relying on it.

Outcome: Explain what each statement does, trace values through a short program, and distinguish syntax, runtime, and result errors.

Bridge: One order can be represented by a few values; next we organise many related values and records.

## Chapter 2 — Collections and Data Transformation

Objective: Choose data representations and explain their ordering, lookup, and mutation behaviour.

1. Strings as sequences: indexing, slicing, and common transformations
2. Lists: ordered mutable collections
3. Tuples: fixed records and immutable sequence structure
4. Dictionaries: key/value records, lookup, and missing keys
5. Sets: membership, uniqueness, and set operations
6. Mutation, aliasing, identity, equality, and shallow versus deep copying
7. Unpacking, nested collections, and record shapes
8. Sorting and basic transformation built-ins; key functions previewed
9. Comprehensions as a preview of filtering and transformation

Worked illustrations: Order records represented as lists, tuples, and dictionaries; before/after mutation diagrams; shared nested-list surprises; slicing and set comparisons; a small sorted report. Preview comprehension results visually; explain their loop/filter mechanics in Chapter 3 and key functions in Chapter 4.

Outcome: Compare collection choices, predict simple lookup and mutation results, and recognise unintended sharing of mutable data.

Bridge: We have data structures; next we explain how decisions and iteration transform their contents.

## Chapter 3 — Decisions, Loops, and Problem Decomposition

Objective: Trace conditional and repeated execution and break a small problem into explicit steps.

1. Truth values, comparisons, Boolean operators, and short-circuit evaluation
2. if/elif/else and nested decisions
3. for loops and iteration with range, enumerate, and zip
4. while loops, progress conditions, and termination
5. break, continue, loop else, and common loop mistakes
6. Structural pattern matching and its distinction from ordinary comparisons
7. From traced loops to comprehensions and small algorithms

Worked illustrations: Line-by-line inventory filtering and sales aggregation; loop-state tables; short-circuit examples; a nonterminating-loop contrast; a loop rewritten as a readable comprehension; a match example on an order record.

Outcome: Predict control flow, explain termination and boundary cases, and compare a loop with an equivalent comprehension.

Bridge: Repeated logic is now visible; next we give it names, inputs, outputs, and clear responsibilities.

## Chapter 4 — Functions, Scope, and Contracts

Objective: Construct reusable calculations and explain how calls bind inputs and produce outputs.

1. Definitions, calls, return values, None, and multiple-result conventions
2. Positional and keyword arguments; positional-only and keyword-only parameters
3. Defaults, mutable-default pitfalls, and variadic arguments
4. Argument binding, mutation, and object-sharing semantics
5. Local, enclosing, global, and built-in name lookup
6. Pure calculations, side effects, and explicit dependencies
7. Docstrings, annotations, and runtime validation: different roles
8. Recursion, base cases, and iterative alternatives
9. Decomposing a program; functions as values in simple callbacks

Worked illustrations: Pricing functions with call/return traces; a shared-default failure; names and objects across a call; annotated function contracts; recursive category totals versus a loop; a named sorting-key function.

Outcome: Explain parameter binding and scope, construct a small calculation from functions, and identify hidden side effects and invalid assumptions.

Bridge: Functions organise computation; next we connect that computation to files and handle failures at its boundaries.

## Chapter 5 — Files, Structured Data, and Failure Handling

Objective: Explain how a program exchanges persistent data while validating inputs and releasing resources.

1. Paths and filesystem operations with pathlib
2. Unicode text, bytes, encoding, and decoding boundaries
3. File reading/writing, modes, and incremental processing
4. Using with for deterministic resource cleanup
5. CSV and JSON: parsing, record shapes, and serialization limits
6. Exceptions, try/except/else/finally, and targeted handling
7. Raising and chaining exceptions; domain-specific error meaning
8. Validation, malformed records, missing fields, and recovery policies
9. Dates, time zones, Decimal, and domain-appropriate representations
10. Worked import-to-report flow: valid records, rejected records, and output

Worked illustrations: A short CSV/JSON sample paired with parsing code and expected records; a Unicode decoding failure; an exception-flow diagram; cleanup on success/failure; monetary calculations from decimal strings; a timestamp interpretation contrast.

Outcome: Explain file and data boundaries, trace successful and failed input handling, and justify representations and recovery policies.

Bridge: The script now has several responsibilities; next we organise code and dependencies without relying on one large file.

## Chapter 6 — Modules, Environments, and Dependencies

Objective: Explain how reusable Python code is located, organised, and isolated.

1. Modules, imports, namespaces, and import-time execution
2. Packages, relative/absolute imports, and circular-dependency symptoms
3. Script entry points, __name__, and python -m
4. Discovering and reusing the standard library
5. Virtual environments, interpreters, and installing dependencies
6. Project boundaries, dependency declarations, and reproducible-environment concepts

Worked illustrations: A reporting project split into calculation, input, and command-line modules; an import graph and circular-import failure; annotated environment/install commands; distinguish import-package names from distribution names. Commands are illustrations, not actions the learner must run.

Outcome: Explain module execution and import boundaries, interpret a project layout, and distinguish an environment from a distributable package.

Bridge: Modules organise code; next we decide when related data and behaviour should form domain objects.

## Chapter 7 — Classes and Domain Modelling

Objective: Compare object-based designs and express domain behaviour without unnecessary inheritance.

1. Classes, instances, construction, and instance state
2. Attribute lookup; instance versus class attributes
3. Methods, self, class methods, and static methods
4. Dataclasses, generated methods, and per-instance defaults
5. Composition, responsibilities, and object collaboration
6. Inheritance, overriding, super, and a conceptual method-resolution order
7. Polymorphism and duck typing across interchangeable behaviours
8. Object invariants, validation boundaries, and choosing functions versus classes

Worked illustrations: Order and LineItem examples using plain classes and dataclasses; a shared-class-attribute mistake; composition versus inheritance diagrams; interchangeable pricing strategies; a brief dataclass-decorator explanation before custom decorators in Chapter 9.

Outcome: Explain instance behaviour, compare class and function designs, and justify composition or inheritance for a stated responsibility.

Bridge: Objects now model the domain; next we connect their behaviour to the protocols used by Python’s own syntax and built-ins.

## Chapter 8 — Iteration, Context, and the Python Data Model

Objective: Explain how Python protocols support lazy processing, resource management, and predictable object behaviour.

1. Iterable and iterator protocols; iter, next, and exhaustion
2. Generator functions, yield, suspended execution, and generator expressions
3. Lazy pipelines, one-shot consumption, and itertools concepts
4. Context-manager protocols and contextlib
5. Equality, identity, hashing, and collection-key contracts
6. Readable representations, truth testing, and object inspection
7. Special methods for sequence/container behaviour and operator cooperation
8. Properties, attribute access, and a conceptual descriptor model
9. Object lifetime, references, garbage collection, and explicit cleanup boundaries

Worked illustrations: An order generator with execution-state traces; a consumed-iterator surprise; eager versus lazy flow diagrams; a resource-manager example; equality/hash contrasts; a property-backed invariant. Label CPython-specific memory details and avoid equating garbage collection with guaranteed resource cleanup.

Outcome: Trace a lazy computation, explain protocol-driven behaviour, and recognise incompatible equality, hashing, or cleanup assumptions.

Bridge: Protocols let objects cooperate; next we use functions themselves as composable objects and make interfaces more explicit.

## Chapter 9 — Functions as Objects and Advanced Composition

Objective: Explain callable composition and select abstractions that improve clarity.

1. First-class functions, callable objects, lambdas, and callback interfaces
2. Closures, captured state, nonlocal, and late binding
3. Decorators, wrapping order, and parameterised decorators
4. functools: wraps, partial, caching, and their trade-offs
5. Type aliases, generics, Protocol, and static versus runtime guarantees
6. Dispatch strategies and choosing direct code over abstraction

Worked illustrations: A pricing callback, captured-loop-variable failure, decorator expansion into ordinary calls, a wrapped logging function, and a cache with stale-input assumptions; a typed protocol contrasted with runtime validation. No particular type-checker tool is required.

Outcome: Explain closure/decorator execution, compare callable designs, and distinguish type-checking support from runtime enforcement.

Bridge: Code is now composable; next we decide how independently waiting or computing work should execute.

## Chapter 10 — Concurrency and Execution Trade-offs

Objective: Compare execution models using workload characteristics and explicit runtime assumptions.

1. Concurrency versus parallelism; I/O-bound versus CPU-bound work
2. Threads, shared memory, and coordination responsibilities
3. Processes, isolation, serialization, and startup/transfer costs
4. Executors, futures, submission, and result collection
5. Coroutines, async/await, event loops, and cooperative scheduling
6. Task groups, timeouts, cancellation, and cleanup
7. Shared-state races, synchronization, bounded work, and backpressure
8. CPython, the GIL, free-threaded builds, and extension compatibility

Worked illustrations: Serial/thread/process/async timelines for illustrative tasks; executor and coroutine snippets; a lost-update interleaving; a cancelled operation with cleanup; a workload-choice table. Explain GIL-enabled and free-threaded CPython separately and avoid universal speedup claims.

Outcome: Choose a plausible execution model for a stated workload, trace waiting and shared-state hazards, and explain runtime-dependent limitations.

Bridge: Execution choices add complexity; next we combine correctness, diagnosis, performance, and distribution into one coherent program.

## Chapter 11 — Reliable, Efficient, and Distributable Programs

Objective: Explain the engineering decisions behind a maintainable program and its delivery.

1. Testing as a program-quality technique: examples, boundaries, isolation, and regression cases
2. Tracebacks, debugger workflows, assertions, and systematic diagnosis
3. Logging levels, context, and useful operational signals
4. Timing and profiling: baselines, bottlenecks, and measurement limits
5. Algorithmic complexity, collection choices, and memory trade-offs
6. Security boundaries: untrusted input, unsafe deserialization, and subprocess assumptions
7. Command-line interfaces, pyproject.toml, builds, and installation boundaries
8. Integrated walkthrough: organise, validate, diagnose, and package the reporting tool

Worked illustrations: Annotated unittest examples without learner grading; a bug traced from a failing case; supplied timing/profile output; list-versus-set lookup reasoning; an argparse interface and project tree; a local build/install flow. Publishing, infrastructure deployment, and running external commands are outside the plan’s authorisation.

Outcome: Explain quality checks and diagnostic evidence, justify measured improvements, and interpret how a program becomes an installable command-line application.

Bridge: Continue with unfamiliar programs and domain-specific libraries; deeper practical competence grows through separate implementation experience and feedback.

## Sources and scope

The primary baseline is the [Python 3.14 tutorial](https://docs.python.org/3.14/tutorial/) and [language data model](https://docs.python.org/3.14/reference/datamodel.html), supplemented by selected standard-library guides for functions, classes, files, exceptions, typing, context managers, concurrency, and testing. The official tutorial assumes prior programming experience; this course adds a beginner opening instead of copying its order directly.

The [Python Packaging User Guide](https://packaging.python.org/en/latest/tutorials/packaging-projects/) informs project/build concepts. Publisher descriptions and contents were compared for Eric Matthes’s [Python Crash Course, third edition](https://nostarch.com/python-crash-course-3rd-edition) and Luciano Ramalho’s [Fluent Python, second edition](https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/) (2022). Full book text was not accessed. Detailed evidence, coverage mapping, and review status remain in [README.md](../README.md).

Web frameworks, scientific/data libraries, machine learning, GUI/game development, advanced network services, native extensions, exhaustive metaclass programming, and every standard-library API are outside the main course. Descriptors, method resolution, and memory management receive explanatory coverage rather than implementation-level treatment. Type-checker behaviour, third-party tools, platform-specific process details, and package-backend choices require further source verification when lessons are authored. No executable course lessons or measured benchmarks are delivered by this TOC.
