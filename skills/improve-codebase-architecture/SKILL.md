# Improve Codebase Architecture

Find architectural changes that reduce real maintenance friction and improve the ability to verify important behavior.

## Find useful candidates

1. Scope the review to the user's named area or evidence of repeated recent change. Read domain vocabulary, relevant decisions, representative callers, and existing tests.
2. Look for concrete friction: one concept scattered across modules, callers coordinating lifecycle rules, shallow pass-through interfaces, repeated changes, or failures that cannot be tested through the real interface.
3. Apply the deletion test. Ask whether removing a proposed owner would move complexity into many callers or merely remove indirection. Avoid abstractions for hypothetical future variation.
4. For each substantial candidate, identify the files, observed problem, proposed owner and interface, effect on callers, and verification improvement. Mark a conflict with an existing decision only when current evidence justifies revisiting it.
5. Compare a small set of coherent designs. Use a before/after diagram if it clarifies responsibility or data flow. Produce an inline report or an authorized artifact using available tools; do not fetch styling or execution dependencies to render the report.
6. Rank candidates as supported, worth investigating, or speculative, with the reason. Include migration effort and the risk of changing behavior. Recommend the first useful candidate rather than presenting every possible refactor.
7. Once a candidate is selected, resolve the important contract decisions, caller migration order, and focused proof. Preserve existing constraints and behavior through the refactor.

Deliver the candidate report and an actionable plan for the selected design when requested. A review does not authorize rewriting the codebase, editing glossaries automatically, migrating data, or creating tracker issues. Implementation uses the task's existing source, workspace, and review permissions.
