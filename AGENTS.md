# AGENTS.md — Kaizen Wheels Take-home

## Default Behavior

When the user says any of the following, infer the workflow automatically:

- "Do part 1" → use the `kaizen-takehome-runner` skill for Part 1.
- "Do part 2" → use the `kaizen-takehome-runner` skill for Part 2.
- "Do part 3" → use the `kaizen-takehome-runner` skill for Part 3.
- "finalize" → use the `kaizen-takehome-runner` and `writeup-integrity` skills for final docs and checks.
- "commit", "commit this", "checkpoint", "make a commit", or similar → automatically use the `safe-commit` skill before committing.

The user should not need to restate the checklists.

## Assignment Context

This is a 2-hour Product Engineer take-home for Kaizen Wheels, a fake car rental app.

Required work:
1. Fix the price filter bug.
2. Add reservation discounts.
3. Refactor pricing/discount code.
4. Submit `AI_LOG.md` and `DECISIONS.md`.
5. Commit incrementally.

Evaluator cares about:
- AI fluency
- root-cause debugging
- code quality
- product judgment
- verification
- tradeoffs
- timebox discipline

## Commands

Install:
- `npm install`

Run app:
- `npm run dev`

Type check:
- `npm run ts`

Use Codex app browser automation for local UI verification. Do not set up external Playwright unless the repo already has it or the user explicitly asks.

## Scope Rules

Before coding:
- Map relevant files and data flow.
- State assumptions explicitly.
- Separate clear requirements from assumptions.
- Prefer the smallest safe approach.

During coding:
- Prefer minimal, reviewable diffs.
- Do not add dependencies unless necessary.
- Do not rewrite unrelated code.
- Keep business logic centralized where practical.
- Do not duplicate discount math across UI components.
- Search and review pricing must not diverge.

After coding:
- Run checks.
- Use browser verification for user-facing behavior.
- Run Codex review.
- Run CodeRabbit review if available.
- Triage findings before committing.
- Do not claim tests/checks passed unless they actually ran.

## Part 1 — Price Filter

Users must be able to:
- choose `$100/hr` as a real max price,
- choose `$125/hr` as a real max price,
- hide cars above the selected max.

Document whether the final fix should be configurable.

## Part 2 — Discounts

Rules:
- Holiday discount: a reservation that includes a holiday but does not start or end on that holiday gets 17% off total.
- Long reservation discount: a reservation for more than 3 days gets `$10/hr` off the hourly rate.
- Discounts do not stack.
- Search and review must show consistent discounted pricing.

Fictional holidays:
- Jan 21
- Feb 12
- Mar 04
- May 02
- Jun 16
- Jul 26
- Aug 03
- Sep 01
- Nov 05
- Dec 18

## Interactive Decision Gates

This project should not run as a silent one-shot task. The evaluator reads AI_LOG.md and wants to see how the user prompts, verifies, pushes back, and catches issues.

Therefore, before implementing each major section, Codex must stop at a Decision Gate.

A Decision Gate is a short, structured checkpoint where Codex presents:

1. What it found.
2. The likely root cause or business rule.
3. Two or three implementation options.
4. The recommended option.
5. The tradeoff.
6. The verification plan.
7. One question for the user to answer before implementation.

Do not implement a major section until the user approves a direction with a short response like:

- proceed
- choose option A
- choose the clean time-boxed approach
- revise the plan
- challenge this

The user should not need long prompts. Codex should ask for the important decision at the right time.

### Short Commands

When the user says:

- `start part 1`: run root-cause investigation for the price filter and stop at a Decision Gate.
- `start part 2`: run discount truth-table/design planning and stop at a Decision Gate.
- `start part 3`: review the shipped pricing/discount code and stop at a refactor Decision Gate.
- `challenge`: critique the current plan or diff like a strict reviewer; do not edit.
- `proceed`: implement the currently approved plan.
- `commit`: run the safe-commit skill before committing.
- `finalize`: prepare AI_LOG.md, DECISIONS.md, final checks, and docs commit.

### Conversational Evidence

After each Decision Gate and user choice, append or prepare an AI_LOG.md note:

- Decision considered
- Options presented
- User choice
- Reason for choice
- Verification planned

Do not fabricate user reasoning. If the user gives a short answer, summarize only what is supported by the transcript.

## Browser Verification

For user-facing changes, use Codex app browser automation.

Treat browser verification as an actual QA session, not a lightweight smoke test:
- launch or reuse the local app,
- click through the real user flow,
- interact with controls naturally where possible,
- verify visible UI state after each meaningful action,
- create replayable/audit-friendly evidence when the tooling supports it.

For pricing and filtering work, recorded verification is required for:
- price filter behavior,
- discount behavior,
- search/review pricing consistency,
- major pricing-related user flows.

Record:
- scenario
- actions
- expected
- observed
- PASS / FAIL / UNCLEAR
- screenshots/appshots where useful
- replay/recording artifact path if one exists
- if recording/replay is unavailable, state that and provide the best available visual artifact path

Do not edit code during browser verification unless verification fails and the user-facing cause is clear.

## Code Review

Use `code_review.md` for Codex review and CodeRabbit triage.

Do not blindly accept AI, Codex review, or CodeRabbit suggestions.

Fix now:
- requirement misses
- runtime bugs
- type errors
- price/filter correctness issues
- discount stacking bugs
- search/review price mismatch

Defer:
- broad architecture rewrites
- full test-suite expansion
- production configurability outside the timebox
- non-critical UX polish

Reject:
- unrelated cleanup
- style-only churn
- speculative abstractions

## Documentation

`AI_LOG.md`:
- include full AI transcript when available
- include review/check summaries
- include CodeRabbit triage if used

`DECISIONS.md`:
- bug root cause
- fix
- discount assumptions
- refactor rationale
- verification performed
- what would be done with another 30 minutes
- optional UX callout

## Finalize Rule

When the user says "finalize":
1. Make sure `AI_LOG.md` has a summary and space for full transcript.
2. Make sure `DECISIONS.md` contains root cause, tradeoffs, refactor rationale, verification, next 30 minutes, and optional UX callout.
3. Run `npm run ts`.
4. Run a final Codex review.
5. Run a final CodeRabbit review if available.
6. Commit docs with `docs: add AI log and implementation decisions` if all required checks pass.
