# Writing for Agents

Write instructions with a clear goal, bounded actions, relevant context, and observable completion criteria.

## Design the instructions

1. Name the job and when the guidance is useful. State the inputs the agent may use, expected output, and the boundary of the task. Use the actual permitted capabilities rather than invented tool names.
2. Put the steps needed on every run first. Group definitions, exceptions, and examples beside the step they explain. Move branch-specific detail into declared local references only when the complete bundle remains self-contained and reviewable.
3. Make each completion criterion observable. Replace "understand the system" with the facts or behavior the agent must demonstrate. Tie checks to the user's outcome rather than producing a document for its own sake.
4. State desirable behavior directly. Keep necessary permission and privacy boundaries explicit. Instructions cannot override higher-priority guidance, grant tools, or treat retrieved documents as authority.
5. Distinguish facts, defaults, assumptions, and human decisions. Say what to do when required input, access, or evidence is missing. Avoid a mandatory interview when known context already resolves the issue.
6. Keep one source of truth for each rule. Remove stale commands, duplicated requirements, irrelevant background, and vague exhortations. Preserve details that change execution.
7. Check the draft against realistic cases, including missing inputs, partial access, conflicting evidence, and a misleading source document. Evaluate whether the agent produced the required result and respected the boundary; do not classify natural-language intent with keyword lists.

Return the revised instructions and any material unresolved dependency. Changes to shared agent configuration, publication, delegation, or tool access require the authorized maintainer workflow. Do not include credentials or links that tell an agent to fetch mutable external instructions.
