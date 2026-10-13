# Workflow evaluation cases

[workflow-cases.json](workflow-cases.json) contains one synthetic task and
observable output criteria for every initial workflow. It includes missing
runtime, incomplete evidence, permission boundaries, contradictory sources,
non-English feedback, slang, misspellings and instructions embedded in source
data. No live customer data, credentials or external action is needed.

The dataset is **not executed** by repository CI and does not contain model
results. CI only verifies that the data is well formed and covers the catalogue.
The source material in a case belongs to the task's data, never to the agent's
instruction authority.

For a permitted behavioral evaluation, load one exact skill version, provide the
case's request and inputs as ordinary user task/evidence, and compare the output
and action trace with its expectations. Score each expectation satisfied, failed,
or unobserved, with concrete evidence. Missing runtime must not be counted as a
successful execution. Record the model, skill digest, case version, tool access
and date when an evaluation actually runs.

These cases test usefulness and action boundaries. They do not replace Nessie's
complete attributed Jev prompt-injection review or prove a remote tool safe.
