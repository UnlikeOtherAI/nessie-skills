# TypeScript Best Practices

Use types and boundary validation to express real domain states while keeping the code simple and testable.

## Inspect the contract

Read the relevant repository conventions, runtime schema library, compiler settings, and callers. Types describe validated values; they do not validate external data by themselves.

## Apply the useful rules

1. Parse external data as `unknown` with the project's existing runtime schema library. Derive TypeScript types from schemas where practical. Keep unvalidated property bags at the input boundary.
2. Model alternatives as discriminated unions when they have different required fields. Avoid optional-field bags that permit impossible combinations. Use exhaustive handling so adding a variant exposes missing cases.
3. Brand domain identifiers where mixing otherwise identical primitives would cause a real bug. Validate before construction. Use stronger types such as nonempty lists only where ordinary types force unsafe assumptions.
4. Prefer discriminant checks, the `in` operator, and language narrowing over casts. A custom type guard must verify everything it claims. Use `satisfies` to validate a literal without discarding its useful inferred shape.
5. Derive related types with existing utility types rather than duplicating contracts. Use object parameters when naming several arguments prevents mistakes, subject to actual hot-path needs.
6. Keep errors and side effects explicit. Use the existing structured logger with enough nonsecret context to debug a failure. Preserve meaningful comments about constraints.
7. Test behavior through real public interfaces. Exercise runtime validation with invalid inputs and authorization boundaries when relevant. Typechecking alone does not prove runtime correctness.

Deliver focused code changes or review findings, the invariant each type protects, and checks actually run. Avoid new abstractions or dependencies without a current need. Source access, editing, package installation, and running code must already be authorized. If runtime or source access is absent, provide a bounded review of the supplied material and name the verification gap.
