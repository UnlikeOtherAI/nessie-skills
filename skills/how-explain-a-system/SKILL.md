# How: Explain a System

Explain a system's ownership and runtime flow from actual source and observed behavior at the level the reader needs.

## Trace the system

1. Restate the question and scope. Start from the user-visible action, API entry point, or named module. Read current project vocabulary and relevant design decisions when available.
2. Trace a representative path from input to result. Identify the owning modules, state changes, important interfaces, external dependencies, and error paths. Cite real source locations.
3. Separate the intended design from what the current implementation does. Note configuration, feature flags, deployment mode, or version assumptions that change the path.
4. For a complex subsystem, investigate a few distinct angles such as admission, execution, and recovery. Optional authorized delegation can help, but do not require specific models or external orchestration.
5. Verify critical claims with focused runtime evidence when authorized and useful. A source-level explanation should say when behavior was inferred rather than run.
6. Build a short explanation around the question. Use a small diagram only if it clarifies relationships or order. Keep the necessary concepts, the runtime path, where important responsibilities live, and practical failure cases.

Deliver a working explanation with source pointers and confidence limits. If only a document or snippet is supplied, explain that material and identify the access needed to verify the larger system. Do not invent unseen callers, undocumented APIs, or historical motivation. Explanation does not grant code changes, machine access, or external communications.
