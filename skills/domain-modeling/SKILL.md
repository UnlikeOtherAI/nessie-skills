# Domain Modeling

Build a shared vocabulary for a team's real concepts, relationships, and business rules.

## Sharpen the model

1. Read the existing glossary, relevant decisions, supplied examples, and permitted source records. If several contexts use the same word differently, keep the contexts separate.
2. Identify ambiguous terms. Ask what a word refers to using a concrete scenario, such as whether an account means a person, a customer contract, or an organization. Use evidence before asking for a preference.
3. For each concept, record its definition, identity, relevant lifecycle, and relationships. Distinguish a type of thing from an individual instance, and a rule from an implementation choice.
4. Test the model with ordinary and edge cases. Can an order be partly canceled? Can one person belong to two organizations? What remains true after a state changes? Use only scenarios relevant to the user's domain.
5. Compare the agreed model with actual code or records when access exists. Surface contradictions with evidence rather than silently redefining a term to fit the implementation.
6. Propose a canonical name and concise definition for settled concepts. Preserve unresolved alternatives as open questions. If document edits are authorized, update the existing glossary as decisions settle.

## Deliver

Provide a glossary, a small relationship map where useful, the important invariants, and unresolved questions. Keep implementation details in design documents rather than the glossary. Record a separate decision only for a substantial, hard-to-reverse tradeoff whose reason a future reader needs. This workflow does not authorize identity access, schema migrations, or publishing a new organizational model.
