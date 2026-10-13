# Pull Request Description

Write a reviewable pull request description that explains the problem, resulting behavior, evidence, and material risks.

## Prepare the description

1. Read the final diff, relevant brief, repository template, and actual verification results. Describe the delivered scope rather than abandoned approaches or conversational history.
2. Lead with the concrete problem and what a user or caller can now do. Use a before/after example when it makes the behavior clear.
3. Explain the important ownership or flow change in a few sentences. A small call tree, diff sketch, or diagram is useful only when it helps a reviewer assess the change faster.
4. State verification that actually ran, with enough evidence to understand its coverage. For a UI change, reference rendered evidence when available. For a bug fix, describe the failing case and the passing check.
5. Name what was not verified and why it matters. Distinguish mocked behavior, source inspection, and a real running application. Do not imply success from a skipped test.
6. Explain a material migration, rollback, compatibility, or access risk when present. Avoid a generic danger section for a routine reversible edit.
7. Follow required issue links, changeset language, and template sections. Remove credentials, private output, agent process logs, and irrelevant commit lists.

Deliver the title and body as a draft or update them through the authorized repository workflow. Writing a description does not authorize opening a PR, posting a comment, merging, or deploying. Keep attribution in the distribution's provenance material when this workflow's format is reused.
