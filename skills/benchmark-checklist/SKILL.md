# Benchmark Checklist

Check whether a measured performance result is correct, repeatable, fairly configured, and relevant to the user.

## Frame the claim

Write the claim with workload, metric, unit, and scope before measuring. Read what the harness times, counts, and excludes. Check current host activity through approved tools before starting a substantial job. Use comparable versions, data, concurrency, release settings, and cache conditions.

## Verify the measurement

1. Identify the limiting resource with a separate diagnostic run. A profiler changes timing, so do not mix its result into the reported performance runs. Check that the load generator is not the limiter.
2. Confirm that both sides use reasonable production configuration. An untuned database or debug build measures a configuration difference. State any condition you cannot equalize.
3. Check physical and arithmetic limits: throughput against bandwidth, work against available cores, and maximum end-to-end benefit from the changed component's share of total time.
4. Count errors, retries, and non-success responses. Verify output correctness. Fast failures are not fast successful work.
5. Confirm that the intended work actually occurs inside the timed region, including awaited promises, consumed results, written rows, and reached services.
6. For a comparison, alternate sides across at least five runs when practical. Report median and range, warmup treatment, and run-to-run variation. A difference smaller than noise is no measurable difference.
7. Measure the user-visible path with realistic data. Put a microbenchmark's result beside its share of that whole path.

For an explicitly requested rough estimate, a single run can be useful if correctness and completed work were checked and the limitation is stated. Choosing between implementations requires stronger evidence.

Deliver faster, slower, no measurable difference, or inconclusive with the run count, conditions, limiter, and evidence. Missing runtime or required measurements means `NOT_SCORED` or inconclusive, never invented timing. This workflow does not authorize stress on shared or production systems.
