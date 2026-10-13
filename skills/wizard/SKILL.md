# Wizard

Guide a person through a procedure that needs human access or judgment, with clear steps and observable completion checks.

## Prepare the procedure

Use the current official documentation and permitted browser context or supplied screenshots. Identify the starting state, target state, required role, and steps the agent can already perform under the task's permissions. Reserve human guidance for steps the person actually needs to do.

For each stage, name the destination, the action, the expected visible result, and the next step. Mark irreversible actions and the decision needed before them. Never invent a dashboard label or claim to see a screen you have not inspected.

## Guide one stage at a time

1. Explain the current stage and why it is needed. Open the relevant destination only through an already approved browser capability, or give the person a verified destination to open.
2. Give concrete instructions using the interface's current labels. Keep the important information visible together.
3. Ask the person to confirm the nonsecret result when the next stage depends on it. If the result differs, inspect the actual state or ask for the visible error, then adjust the procedure.
4. For secrets, tell the person to enter the value directly into the service's approved secure field or secret manager. Request only a nonsecret confirmation that the step succeeded. Never ask them to paste a password, recovery code, API key, or token into chat, a document, or a log.
5. At an irreversible or privileged step, follow the task's existing approval requirements. Guidance does not authorize provisioning, payment, credential changes, or a production cutover.
6. Finish by verifying the target state through a visible confirmation, safe read, or supplied evidence. List remaining steps without claiming completion.

Deliver a short checklist and verified status. This adaptation produces guidance rather than executable credential-capture scripts. A request for reusable automation needs a separate approved implementation workflow and secure input design.
