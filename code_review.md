# code_review.md — Review Standards

## Review Mode

Review like a strict senior engineer evaluating a timeboxed take-home.

Use:
- PASS
- RISK
- FAIL
- UNCLEAR

Prioritize hiring risk over style preferences.

## High-Risk Findings

Treat these categories as high-risk:
- a stated requirement is not met by the implementation
- runtime errors or unhandled exceptions in user-visible flows
- type errors or violations of declared interfaces
- correctness bugs in business logic (off-by-one, wrong operator, swapped variables)
- inconsistent values shown across screens for the same underlying data
- duplicated business logic across UI components that can drift
- inconsistent number/money rounding or unit confusion (cents vs dollars, hours vs days)
- docs that claim tests/checks ran when they did not

## Medium-Risk Findings

Treat these categories as medium-risk:
- unclear helper/variable names around business-critical logic
- weak focused test coverage for changed business logic
- missing documentation for non-obvious assumptions
- confusing labels or affordances in the UI
- fixed configuration that should be production-configurable but is not documented
- browser QA lacks audit-friendly scenario notes or visual/replay artifacts

## Low-Risk Findings

Treat these categories as low-risk:
- broad architecture preferences
- unrelated cleanup
- cosmetic UI polish
- style-only comments
- speculative abstractions

## Triage Format

For every review finding, classify as:

Accepted:
- fix now

Deferred:
- valid but outside the timebox

Rejected:
- unrelated, too broad, low-signal, or style-only

Never claim a test/check passed unless it actually ran.
