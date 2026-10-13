# Diagnosing Bugs

Find a root cause with a repeatable reproduction, falsifiable hypotheses, and a check that proves the fix addresses the reported symptom.

## Establish the feedback loop

Use authorized source and runtime access. Read relevant project instructions and domain vocabulary. Describe the user's exact symptom before changing code. Redact secrets from requests, logs, traces, and screenshots.

1. Build the smallest practical pass/fail reproduction at the boundary where the bug occurs: an existing test, safe HTTP request, CLI fixture, permitted headless browser journey, or replay of a sanitized trace.
2. Run it and capture the failure. Tighten its speed and determinism without changing the symptom. For intermittent failures, record a bounded repetition count and observed failure rate.
3. Minimize the scenario one input or step at a time, rerunning after each change. If access cannot reproduce the bug, report attempts and the specific missing evidence. Do not present a code-reading theory as a confirmed diagnosis.

## Test causes and repair

1. Write a few ranked hypotheses. Each predicts how a specific change or observation would distinguish it from the others. Share the useful hypotheses without blocking routine permitted investigation.
2. Probe one variable at a time with targeted instrumentation. For performance, measure the baseline and use a profiler or relevant query plan rather than guessing from logs.
3. Turn the minimized reproduction into a meaningful regression check where the real call pattern can be exercised. If the architecture offers no suitable seam, name that limitation.
4. Apply the smallest root-cause fix. Verify that the regression check fails before and passes after. Rerun the original scenario and applicable focused checks.
5. Remove temporary instrumentation and disposable material within your own authorized workspace. Preserve useful evidence and any unresolved risk.

Deliver the symptom, confirmed cause, change, reproducible check, and observed result. Production instrumentation, shared-environment stress, destructive replay, deployment, and repository publication follow their existing permissions. This skill does not authorize them.
