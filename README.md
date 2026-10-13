# Nessie skills

Reusable workflows for agents, with exact source attribution and readable,
self-contained instructions. The initial catalogue contains **56 skill
candidates** in eight categories. They help with everyday work, marketing and
engineering using supplied material and tools already authorized for the task.

These are community-origin adaptations. Repository inclusion does not mean
Nessie approval, a successful prompt-injection check, or product publication.
Nessie imports drafts from an exact commit and checks the complete version
before an eligible release can be published. It never follows the branch head
or updates agent instructions automatically.

## Find a workflow

| Category | Workflows |
| --- | --- |
| Everyday work and planning | 14, including the Unslop default candidate |
| Brand and audience | 4 |
| SEO, websites and content | 10 |
| Social media and video | 5 |
| Email marketing | 3 |
| Campaigns, advertising and partnerships | 5 |
| Reporting and launches | 5 |
| Engineering | 10 |

Browse the [skills directory](skills) for entry files. The
[catalogue manifest](catalog.json) maps every human name and purpose to its
bundle, category, source, license and exact hashes. Instructions live in
`skills/<slug>/SKILL.md`; legal and provenance metadata accompany them separately.

Unslop removes filler and unclear writing while preserving useful detail and
uncertainty. It permits real reactions and emoji-only acknowledgments. Product
defaults are enabled only after an eligible checked release exists; this
repository does not change any agent setting by itself.

## Source and license

| Source | Pinned commit | Adapted workflows | License |
| --- | --- | --- | --- |
| Aaron He Zhu's marketing skills | `47b6515023ec6c2494e1b723d0b78a6c1e0ec222` | 32 | Apache-2.0 |
| Matt Pocock's skills | `49dd158d1076134a641b33efb035946536778336` | 16 | MIT |
| Lauren Tan's original PStack in Cursor plugins | `dbf49813a39c1a5389c5e28cb8e4c1c2379e2454` | 8 | MIT |

Exact upstream paths, authors, source-byte hashes, adapted hashes and changes
are in the manifest. Full license texts and retained credits are in
[NOTICE.md](NOTICE.md) and [license-index.json](license-index.json). The root MIT
license covers original repository material; it does not replace a bundle's
third-party license.

The adaptations remove foreign registry/memory machinery, required scorer or
setup scripts, mandatory orchestration, automatic artifact writes and implied
publishing or spending authority. They retain concrete workflow steps, evidence
requirements and missing-input limits. Audits without a supported runtime or
required measurements report `NOT_SCORED` instead of fabricating a verdict.
Poteto Mode, Make Bot UI and unchanged No Comments are excluded from this corpus.

## Validate locally

Use Node.js 24 or newer. The repository needs no dependency installation.

```text
node scripts/validate.mjs
node --test test/validate.test.mjs
```

Structural checks cover schema, hashes, licenses, canonical paths, declared local
references, text integrity, unexpected bundle files and complete size bounds.
Meaning and prompt-injection judgments remain with Nessie's authorized review
service. See [SECURITY.md](SECURITY.md) for the limits and safe CI protocol, and
[CONTRIBUTING.md](CONTRIBUTING.md) to propose a workflow.

The [apps directory](apps/README.md) reserves future content-only MCP app
manifests. There are **zero app manifests** in this version. The public importer
accepts skills only, and no executable server source or credentials live here.
