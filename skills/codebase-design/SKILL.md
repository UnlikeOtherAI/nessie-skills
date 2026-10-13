# Codebase Design

Design modules that hide useful complexity behind a small, clear interface and keep related behavior and verification together.

## Use a shared vocabulary

A module has an interface and an implementation. Its interface includes parameters, invariants, ordering, configuration, errors, and performance assumptions that callers must know. A seam is a place where behavior can vary without rewriting its callers. An adapter supplies a concrete implementation at that seam. A deep module gives callers substantial useful behavior for a small interface; depth is not a count of implementation lines.

Use existing project terminology when it describes these concepts clearly. Do not rename established concepts merely to match this vocabulary.

## Shape the design

1. Read representative callers, related failures, tests, and architectural decisions. Name the repeated complexity the module should own.
2. Sketch the smallest interface that meets current requirements. Keep policy and lifecycle ordering inside the owning module when callers should not coordinate them separately.
3. Apply the deletion test. If removing the module makes its complexity reappear across callers, it owns useful work. If removing it only deletes a pass-through, consider whether it is needed.
4. Inject genuinely variable external dependencies at a useful seam. Avoid abstractions for hypothetical future adapters. Return explicit results where doing so makes behavior easier to inspect and test.
5. Test through the interface that callers use. Include important errors, authorization, and concurrency semantics when they are part of the contract. A test that must bypass the interface can reveal a poorly placed seam.
6. Compare an alternative shape when the tradeoff is substantial. Assess caller effort, locality of changes, migration cost, and existing decisions. Keep the simplest supported design.

Deliver the proposed interface, owning responsibilities, caller examples, tradeoffs, and migration/verification plan. Planning does not authorize an architectural rewrite or database migration. Source access and implementation follow the task's permissions.
