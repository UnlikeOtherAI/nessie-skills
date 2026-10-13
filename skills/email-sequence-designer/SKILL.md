# Email Sequence Designer

Design a customer email journey with meaningful triggers, timing, branches, exits, preferences, and frequency controls.

## Map the journey

1. Define the purpose, lifecycle stage, audience, trigger source, and available events. Inventory existing flows or supplied exports. If a required trigger or eligibility rule is unknown, identify it before calling the flow executable.
2. For each flow, name the entry condition, ordered steps, delay, message purpose, goal, and responsible owner. Use welcome, abandoned action, post-purchase, nurture, or outreach patterns only when they fit the stated task.
3. Define branch and exit behavior. Conversion, reply, unsubscribe, hard bounce, suppression, or revoked eligibility must stop the affected path according to existing account policy.
4. Tie segments to real definitions and their observation time. Use opaque or aggregate audience references in the design rather than copying addresses into a document. Do not enroll people from a draft flow.
5. Set global frequency limits and quiet-hour or send-window proposals across overlapping flows. Mark estimated cadence assumptions and identify the owner who approves them.
6. Include preference controls, usable opt-out, fatigue treatment, and sunset behavior. Do not rely solely on open signals where privacy features make them unreliable. Separate a re-consent program from ordinary nurture.
7. Link each planned step to its creative and destination version. Define what a later implementation must verify immediately before dispatch: current eligibility, suppression, approved payload, and schedule.
8. Walk ordinary, overlapping, and failure cases. Check that customers progress toward a goal rather than loop indefinitely or receive incompatible concurrent messages.

Deliver a flow table or diagram, trigger/segment contracts, frequency rules, exit cases, and unresolved inputs. Missing runtime or complete scoring evidence means `NOT_SCORED`, not an email-quality verdict. Designing the sequence does not authorize creating, scheduling, or sending it in a provider.

Modified for Nessie. Attribution and change notes accompany this distribution.
