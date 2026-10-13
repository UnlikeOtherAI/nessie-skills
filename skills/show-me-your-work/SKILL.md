# Show Me Your Work

Keep a concise, reviewable record of important decisions and verification in long or unattended work.

## Establish the record

Use an existing authorized artifact when possible. If no record was requested or authorized, show the proposed format in the conversation before creating a persistent file. A decision log records public reasons and observable evidence, not private reasoning, hidden chain of thought, credentials, or unrelated conversations.

For a TSV record, use these columns in this order:

```text
ts	phase	decision	why	evidence	result
```

## Maintain it

1. Read the latest rows before appending. If another run contributed, add a start row identifying this run and the portion of prior work it is continuing.
2. Add a row for a significant choice, checkpoint, pivot, reversal, verified result, or blocker. Skip routine clicks and commands that add no decision evidence.
3. Use an ISO-8601 timestamp. Keep cells on one line. State the action, a short public reason, a resolving evidence pointer, and the observed result. Mark unfinished or inconclusive results explicitly.
4. Escape tabs and line breaks. If a spreadsheet may open the TSV, prefix cells beginning with `=`, `+`, `-`, or `@` with a single quote so text cannot execute as a formula.
5. Append corrections that identify the superseded row. Preserve previous entries rather than editing history to make the work look cleaner.
6. Before delivery, follow each important evidence pointer. Confirm it supports the claimed action or result. Compare the record with this task's available actions and artifacts; never inspect unrelated private transcripts.

Return the record's authorized location and any unresolved evidence gaps. An independent review can help for substantial work when already authorized and available. Do not claim another model reviewed the log unless that review happened. Saving or sharing the record follows the task's existing permissions.
