---
name: safe-commit
description: Use automatically when the user says commit, commit this, safe commit, checkpoint, make a commit, save changes, or similar. Runs checks, browser QA, Codex review, CodeRabbit review, triages findings, fixes high-risk issues, updates docs, and then commits if safe.
---

# Safe Commit

This skill runs whenever the user asks to commit.

Do not ask the user to restate the checklist.

## Conversational Review Requirement

Before committing, produce a short review summary and ask the user whether to proceed if any medium/high-risk issues remain.

If all checks pass and only low-risk/deferred issues remain, the user may simply say `commit` or `proceed` and Codex may create the commit.

Do not turn safe-commit into a silent black box. It should create evidence for AI_LOG.md: checks run, browser verification, CodeRabbit/Codex review findings, triage decisions, and final commit message.

## Step 1 — Identify Scope

Inspect the diff and classify the commit:

- `part1-price-filter`
- `part2-discounts`
- `part3-refactor`
- `docs`
- `mixed`

Use changed files and behavior to infer the section.

## Step 2 — Run Terminal Gate

Run:

```bash
./scripts/commit-gate.sh <scope>
```

If the script is missing, run at minimum:

```bash
npm run ts
```

If a relevant test script exists, run it.

If pricing/discount logic changed and focused tests are cheap to add, add or update focused tests for changed pricing helpers. Do not attempt broad whole-repo coverage.

## Step 3 — Browser QA

If UI or pricing behavior changed, use the `browser-qa` skill and Codex app browser automation.

Do not edit code during QA unless the QA result fails.

Browser QA must be audit-friendly:
- launch or reuse the local app,
- click through the real flow,
- record visible state after meaningful actions,
- capture screenshots/appshots where useful,
- create a trace/video/replay artifact if the tooling supports it,
- record the artifact path in `AI_LOG.md`; if no replay/recording support exists, state that and include screenshot/appshot artifact paths.

Required scenarios by scope:

### part1-price-filter

Verify:
- default search still works
- max `$100/hr` hides cars above `$100/hr`
- max `$125/hr` is selectable and hides cars above `$125/hr`
- high/default max allows expensive cars if otherwise available

### part2-discounts

Verify:
- no-discount reservation
- holiday-only reservation
- starts-on-holiday: no holiday discount
- ends-on-holiday: no holiday discount
- exactly 72 hours: no long-reservation discount
- more than 72 hours: long-reservation discount
- both discounts eligible: lower final total wins
- search and review page show consistent pricing

### part3-refactor

Verify:
- search still works
- one discounted search result matches review page
- no behavior changed from the previous section

Record browser QA in `AI_LOG.md` and include artifact paths for replay/recording or screenshots/appshots.

## Step 4 — Codex Review

Run Codex review on the current diff if available in this environment.

Use `code_review.md` as the review standard. If `/review` cannot accept custom instructions, perform an equivalent strict review using `code_review.md` manually.

Classify findings:
- Accepted
- Deferred
- Rejected

Fix high-risk accepted findings only.

## Step 5 — CodeRabbit Review

If CodeRabbit CLI is available, run:

```bash
cr --agent --type uncommitted
```

If unavailable, try:

```bash
cr --plain
```

or:

```bash
coderabbit review --plain
```

If CodeRabbit is unavailable or unauthenticated, note that clearly and continue with Codex review.

Triage findings using `code_review.md`.

Fix high-risk accepted findings only.

Run at most two CodeRabbit/fix loops. Do not get trapped polishing nits.

## Step 6 — Re-run Checks

After fixes, re-run relevant checks.

At minimum:

```bash
npm run ts
```

Re-run browser QA only for scenarios affected by fixes.

## Step 7 — Update Docs

Update `AI_LOG.md` with:
- scope
- checks run
- browser QA scenarios, statuses, and artifact paths
- Codex review summary
- CodeRabbit status
- accepted/deferred/rejected findings

Update `DECISIONS.md` if a root cause, tradeoff, assumption, limitation, or verification result changed.

Do not invent verification.

## Step 8 — Commit

If required checks pass and high-risk accepted findings are fixed, commit.

Use a conventional commit message:

- `fix: enforce selected max price filter`
- `feat: apply best eligible reservation discount`
- `refactor: clarify reservation pricing logic`
- `docs: add AI log and implementation decisions`

If checks fail, do not commit. Report the blocker and the smallest fix.
