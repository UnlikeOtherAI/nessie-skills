# Blast Radius

Find what a change could break beyond its diff and verify the critical facts on which its safety depends.

## Follow the effects

1. Pin and read the change, including added, changed, and removed contracts. State the behavior that changes and the assumptions the diff leaves implicit.
2. Identify the one or two facts that make the change safe. Examples include a function affecting only expired entries, or every consumer validating a new field. Treat these as claims to prove.
3. Trace direct callers, then follow what a symbol search misses: serialized data, database columns, wire formats, asynchronous ordering, teardown, another language reading the same bytes, configuration, and downstream dependencies.
4. Read the actual pinned library version and relevant local patches. Check timing and lifecycle semantics from source rather than assuming a familiar API behaves the same way everywhere.
5. For each plausible risk, name its concrete trigger, effect, affected code, and cheapest useful check. Separate confirmed risks from cases examined and cleared. Avoid invented probabilities.
6. Run a focused test or safe reproduction that exercises the real behavior when authorized. For important user flows, verify the running app when possible. Otherwise mark the safety claim unproven and state the missing access.

## Report evidence honestly

Distinguish a statement, a source location, a traced impossible path, a real executed check, and a running-app reproduction. Strong wording cannot substitute for stronger evidence.

Deliver what changed, the critical safety facts and their proof level, concrete risks, cleared cases, and checks needed before release. A wider independent review can help when authorized. This workflow does not authorize merging, production stress, database changes, or machine access merely to strengthen the report.
