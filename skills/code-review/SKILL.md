# Code Review

Review a defined change separately for repository standards and fulfillment of the requested behavior.

## Pin the review

Resolve the requested base revision and candidate revision. Include uncommitted changes when the task requests them. Verify that the comparison is meaningful and identify the originating brief or specification. If the requirement source is unavailable, continue the code review and explicitly mark the fulfillment review incomplete.

## Inspect two independent concerns

1. Read repository instructions, relevant architecture and testing standards, the diff, and enough callers to understand behavior. Use the project's enforced conventions rather than applying an arbitrary style preference.
2. Compare each material requirement with the implementation and user entry point. Identify missing behavior, incorrect interpretation, access leaks, and unrequested additions. Quote or link the requirement and the changed code that creates the gap.
3. Inspect correctness and design beyond changed lines: data boundaries, authorization, failure recovery, concurrency, durable state, external input validation, and compatibility where relevant.
4. Note duplication, unclear names, scattered ownership, and speculative abstractions only when their impact is concrete. Distinguish an architectural judgment from a documented violation.
5. Inspect tests and run focused safe checks when authorized. Explain what a test proves. Do not turn a compilation pass or mocked protocol test into a claim about an untested user flow.
6. Verify each proposed finding against real code. State the trigger, resulting failure, affected location, and useful repair direction. Remove hypothetical complaints without a plausible supported path.

Deliver standards findings and fulfillment findings separately, ordered by practical severity within each. Include verification and missing evidence. If no actionable findings remain, say so without inventing one. Independent reviewers may be useful for a substantial diff when authorized; they are optional. Review does not authorize editing, merging, deploying, or sending comments to others.
