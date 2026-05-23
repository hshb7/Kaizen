---
name: kaizen-takehome-runner
description: Use when the user says do part 1, do part 2, do part 3, finalize, or continue the take-home. Coordinates the correct workflow without requiring long prompts.
---

# Take-home Runner

Use this skill to route the user's short commands into the correct workflow.

The user should be able to say:

```text
Do part 1.
commit
Do part 2.
commit
Do part 3.
commit
finalize
```

## General Rules

- Do not require the user to restate the assignment.
- Read the assignment's own artifacts (README/prompt/instructions in the repo) for specific requirements; do not encode them in this skill.
- Use `AGENTS.md` as the source of truth for workflow.
- Keep work time-boxed and surgical.
- Make incremental commits after the `safe-commit` skill passes.
- Keep `AI_LOG.md` and `DECISIONS.md` updated with real facts only.
- Do not claim tests/checks passed unless they actually ran.

## Part 1

When the user asks for Part 1:

1. Use `codebase-onboarding` only if the repo map is not clear yet.
2. Use `root-cause-debugger` before coding.
3. Trace the relevant data path end-to-end based on what the assignment actually asks for.
4. Identify the root cause from evidence in the code, not assumption.
5. Present options at a Decision Gate and let the user choose.
6. Implement the smallest safe fix that satisfies the chosen option.
7. Update `DECISIONS.md` with 2–3 sentences covering root cause and fix.
8. Wait for the user to say `commit`, then use `safe-commit`.

## Part 2

When the user asks for Part 2:

1. Use `feature-truth-table` before coding.
2. Restate the explicit requirements from the assignment.
3. Surface ambiguities and call them out for the user to resolve.
4. Build a truth table from the resolved requirements and assumptions.
5. Prefer centralizing business logic rather than duplicating it across UI components.
6. Present design options at a Decision Gate and let the user choose.
7. Add focused tests for the business logic if cheap and low-risk.
8. Update `DECISIONS.md` with implementation choice and assumptions.
9. Wait for the user to say `commit`, then use `safe-commit`.

## Part 3

When the user asks for Part 3:

1. Review the shipped code from earlier sections for meaningful cleanup.
2. Avoid unrelated cleanup.
3. Extract helpers/names only where it improves readability or correctness.
4. Re-run relevant checks.
5. Update `DECISIONS.md` with refactor rationale and what would be done differently if not time-boxed.
6. Wait for the user to say `commit`, then use `safe-commit`.

## Finalize

When the user says `finalize`:

1. Use `writeup-integrity`.
2. Ensure `AI_LOG.md` has full transcript placeholder/summary and review summaries.
3. Ensure `DECISIONS.md` has:
   - root cause and fix for any bug section
   - assumptions made for ambiguous requirements
   - refactor rationale (if applicable)
   - verification performed
   - next 30 minutes
   - UX callout if available
4. Run `npm run ts`.
5. Run final code review.
6. Run CodeRabbit if available.
7. Fix only critical issues.
8. Commit docs if checks pass.
