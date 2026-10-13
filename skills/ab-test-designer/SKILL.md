# A/B Test Designer

Design or read an experiment with a falsifiable hypothesis, compatible samples, declared metrics, and a separate rollout decision.

## Design the experiment

1. Choose planning or results analysis. Establish the audience, unit of assignment, baseline, proposed change, primary metric, and relevant data. A missing baseline or result set remains a named input gap.
2. Write a hypothesis connecting a supported observation to one change and an expected practical effect. Keep a control and a bounded set of variants, usually two. Avoid changing several causes when the aim is to attribute a result to one variable.
3. Predeclare the primary metric, guardrails, minimum meaningful effect, sample-size method, significance level, power, comparison count, read date, and any sequential rule. Conventional assumptions such as alpha 0.05 and power 0.80 must be labeled assumptions, not universal policy.
4. Calculate sample requirements only with a suitable verified method and complete inputs. Estimate duration from compatible traffic and cover relevant business cycles. Missing compute or input means a design gap rather than a fictional sample count.
5. Bind the experiment to its exact creative, destination, audience, event definition, and measurement contract. A material change starts a new experiment version.

## Read results honestly

Check assignment balance, completed samples, outcome definitions, missing events, repeated looks, and guardrails. Use the predeclared method appropriate to the data, such as a proportion comparison or a continuous-outcome method. Report effect, interval, sample counts, statistical evidence, and practical importance separately. Calculated values retain the provenance of their underlying measurements.

Apply a rollout rule only when it was agreed and the decision owner has authority. Otherwise report the result and `decision: UNDECIDED`. Never choose thresholds after seeing the winner. Deliver the plan or readout, assumptions, uncertainty, and required decision. This skill does not launch an experiment, change traffic allocation, spend, or deploy a winning variant.

Modified for Nessie. Attribution and change notes accompany this distribution.
