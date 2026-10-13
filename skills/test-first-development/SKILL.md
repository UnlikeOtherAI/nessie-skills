# Test-First Development

Implement one observable behavior at a time with a test that fails for the right reason before the code makes it pass.

## Choose the test boundary

Read the brief, repository test instructions, and relevant public interface. Prefer the boundary callers actually use. Identify what a proposed test catches and what it misses. Use the task's accepted testing scope; ask only when an unresolved contract would materially change implementation.

## Work in small cycles

1. Choose one meaningful behavior from the requirements, including a relevant failure or access case when needed. Derive the expected result independently from the specification or a worked example.
2. Write the test through the public interface. Avoid private-method assertions, snapshots that merely mirror implementation, and mocks that erase the behavior being tested.
3. Run the test. Confirm it fails because the behavior is absent or wrong, rather than because setup, compilation, or credentials are broken.
4. Implement only enough behavior to satisfy that slice. Run the test again, then applicable neighboring checks.
5. Refactor cohesive responsibilities while keeping observed behavior and tests intact. Follow the repository's conventions and inspect the result before moving to the next slice.
6. Repeat based on what the previous cycle revealed. Do not write a large imagined test suite before learning the interface's actual needs.

Use real dependencies where safe and practical. Use controlled fixtures or mocks for unavailable external boundaries, and state the resulting coverage limit. Run the repository's supported test path with required nonsecret configuration; never claim a database-backed test ran if it skipped.

Deliver implemented behavior, relevant red/green evidence, and verification gaps. Access to source, runtimes, test data, and repository writes must already be authorized. Tests should protect meaningful behavior rather than inflate a count.
