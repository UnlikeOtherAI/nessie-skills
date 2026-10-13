# Prototype

Create a disposable example that helps a person answer a specific design or behavior question before committing to production work.

## Build the smallest useful experiment

1. State the question the prototype will answer and how the person can judge it. Distinguish a visual layout question from a workflow or state-model question.
2. Choose the lowest useful fidelity: an outline, static mockup, interactive example, or isolated code. Use the existing approved preview or artifact capability. State any assumption that affects the result.
3. Use synthetic data and in-memory state by default. Clearly label the prototype. Keep it isolated from live credentials, production databases, real sends, and payment actions.
4. Make the important states visible: first use, normal success, empty results, errors, and the edge case that motivated the experiment. For logic, show how the state changes after each action. For visual alternatives, let the person compare meaningful differences rather than superficial colors.
5. Provide a straightforward way to open or run it with tools already available. Verify that the example actually loads and the key interaction works when runtime access exists. Do not claim a browser check from a static description.
6. Capture the person's response or observed test result and the decision it supports. List what the prototype does not establish, including scalability, security, or production integration.

Deliver the example and a short verdict tied to the question. Keep retained artifacts in an authorized location. Promotion into production, extra dependencies, persistent storage, or public hosting needs the task's existing authority and normal engineering review. A prototype is evidence for a decision, not a finished capability.
