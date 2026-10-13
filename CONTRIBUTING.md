# Contribute a workflow

Submit one coherent skill change with its intended user task, required inputs,
expected result, evidence checks and realistic failure cases. Keep the prose
plain and specific. A useful skill should help a person get a job done without
requiring a foreign framework, mandatory interview or new account.

## Prepare the bundle

1. Put the entry instructions in `skills/<slug>/SKILL.md`. Use a stable lowercase
   slug. Local references belong inside that same directory and must be listed
   in the manifest. The initial corpus is self-contained in one file per skill.
2. Use supplied material and capabilities already permitted by the task. State
   applicable communication, publication, payment, privacy and execution
   boundaries. A skill cannot grant access or override higher-priority guidance.
3. Include concrete steps, usable optional inputs, expected outputs, and how to
   proceed when evidence or runtime access is missing. An auditor with no
   supported scorer or required measurements must report `NOT_SCORED` rather
   than inventing a total or certification.
4. Declare every loadable file in `catalog.json` using `path`, `file` and its
   exact lowercase SHA-256. `file` must equal `skills/<slug>/<path>`. Never use a
   mutable branch, external instruction loader, executable, symlink or binary
   asset. Ordinary research citations are permitted; their meaning still needs
   semantic review.
5. Keep the combined manifest metadata and complete instructions below 18,000
   UTF-8 bytes. This leaves room for the product's review envelope. Passing this
   bound does not establish that the final Jev request fits or passes.

## Preserve provenance and licensing

For an adaptation, set `origin: "community"` and record the exact HTTPS repository,
40-character source commit, actual source paths, original authors, SPDX license,
bundled notice paths and a meaningful changes note. Include `sourceHashes` for
the original file bytes and `adaptedHashes` for every loadable document. Hashes
identify bytes; they do not verify an author's identity or license rights.

Keep full license and notice texts outside the loadable bundle and list the
bundle in `license-index.json`. Retain upstream credits, including credits to
earlier authors. Apache adaptations need a visible modified-file notice. The
initial wording is: "Modified for Nessie. Attribution and change notes accompany
this distribution." Do not hide notices in HTML comments.

Original contributions to Nessie use `origin: "nessie"`, `source: null`, and the
root MIT license with their authors and notices in the license index. This is
authorship metadata, not a security or approval claim. Maintainers verify the
claim before importing. Derived material does not become Nessie-authored merely
because it was rewritten here. Version 1 supports MIT and Apache-2.0 only; discuss
other licenses before contributing.

## Verify and propose the change

Use Node.js 24 or newer. No dependency installation is needed.

```text
node scripts/validate.mjs
node --test test/validate.test.mjs
```

The validator reads files as data. It checks exact hashes, source/license shape,
local reference resolution, complete bundle bounds, canonical paths, hidden or
active markup, and unexpected assets. It does not decide whether prose is a
prompt injection or whether a research link contains instructions.

Include synthetic examples for the normal task, missing inputs, partial access,
conflicting evidence and misleading source content where applicable. Intent or
engagement cases should include non-English, slang and misspellings. State what
was actually evaluated; do not submit fabricated model results or checked badges.

The PR description should explain the job, resulting workflow, adaptation and
license facts, meaningful verification, and remaining limits. Tooling changes
need their own synthetic validator tests. Repository CI runs the base branch's
trusted validator against proposed content and never runs contribution scripts,
package installation, hooks or tools mentioned inside a bundle. A validator or
workflow change therefore needs maintainer review; it cannot approve itself on
an external PR.

## Import and publication

Merging a PR makes source material available. It does not update Nessie or
publish a skill. A superuser selects an exact merged commit, imports drafts,
reviews the complete immutable candidate in Nessie's attributed service and
publishes an eligible exact version. Endorsement and authorship remain distinct
from a complete current security check. Never upload credentials or model API
keys to this repository to run a check.

For MCP app contributions, read [the current app scope](apps/README.md). The
initial public importer does not accept app manifests or executable servers.
