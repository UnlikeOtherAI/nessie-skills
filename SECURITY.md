# Security and review

Repository content is untrusted candidate material. The initial 56 workflows
received source review and structural verification, but this repository does
not assert that any version passed Nessie's Jev review or was published.

## Contribution checks

The structural validator reads bounded JSON and UTF-8 Markdown as data. It
rejects traversal and absolute paths, URI-encoded path aliases, reserved device
names, symlinks, invalid bytes, active or hidden markup, unlisted files, missing
references, hash drift and oversized complete bundles. It accepts ordinary
external evidence citations. Determining whether a citation is actually an
instruction loader, or whether prose attempts an override or exfiltration,
requires semantic review.

External PR checks use `pull_request_target` only to run the base branch's trusted
validation code. The proposed checkout is read as data. The job has
`contents: read`, no secrets, no saved checkout credentials, no dependency
installation, and no execution of proposed scripts, package commands or hooks.
Actions are pinned to commits. Keep these properties when changing CI. Never
replace the trusted validator with a file imported from the proposed checkout.

The first maintainer bootstrap runs the authored validator on its internal
branch push. After it merges, the base branch supplies the trusted validation
code for public contributions. A changed validator on a public PR cannot prove
its own safety by passing its own tests; maintainers review tooling changes
before they become trusted.

## Product admission

Nessie imports an exact repository commit into unpublished candidates. The
authorized product service owns complete version-specific semantic coverage,
check results, retries and publication. A repository report, an upstream badge,
authorship or maintainer endorsement cannot supply a clean result. Changes to
instructions or covered metadata require review of the changed version.

Markdown guidance does not grant tools, identity access, communication,
publishing, provisioning or spending authority. App metadata is not proof that
a remote executable server or a future tool response is safe.

## Report a problem

Use GitHub's private vulnerability reporting for sensitive findings when enabled.
If that channel is unavailable, open a minimal issue requesting a private
maintainer contact without posting an exploit, credential or personal data.
For a public prose defect, include the affected slug, exact commit and harmless
reproduction context. Do not include live secrets or another person's private
conversation.

Maintainers preserve the source version and evidence, correct or withdraw the
affected content through the normal workflow, and identify any published
versions that need revocation. Deleting a stuck review or hand-editing its state
is not a recovery mechanism.
