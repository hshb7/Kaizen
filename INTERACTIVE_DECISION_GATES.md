# Interactive Decision Gates Addendum

Use this addendum to make the AI workflow show real engineering judgment instead of looking like a one-shot automation script.

## Purpose

The goal is not for the AI to silently do the entire take-home. The goal is for the AI to create short decision checkpoints where the candidate evaluates options, pushes back, approves tradeoffs, and owns the final choices.

The user should not need long prompts. They should be able to type short commands like:

```text
start part 1
proceed
challenge
commit
start part 2
proceed
commit
finalize
```

The AI should know how to turn those short commands into a guided engineering conversation.

---

## Patch AGENTS.md

Add this section to `AGENTS.md` (it is already included in the current `AGENTS.md`):

```md
## Interactive Decision Gates

This project should not run as a silent one-shot task. The evaluator reads AI_LOG.md and wants to see how the user prompts, verifies, pushes back, and catches issues.

Therefore, before implementing each major section, the agent must stop at a Decision Gate.

A Decision Gate is a short, structured checkpoint where the agent presents:

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

The user should not need long prompts. The agent should ask for the important decision at the right time.

### Short Commands

When the user says:

- `start part 1`: run investigation for the first assignment section and stop at a Decision Gate.
- `start part 2`: run design planning for the second assignment section and stop at a Decision Gate.
- `start part 3`: review the shipped code from earlier sections and stop at a refactor Decision Gate.
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
```

---

## Add Skill: guided-section-runner

See `.agents/skills/guided-section-runner/SKILL.md` for the implementation. That skill is generic and does not encode assignment-specific answers; it runs decision gates around whichever section the user starts.

---

## Patch safe-commit skill

Add this paragraph near the top of `.agents/skills/safe-commit/SKILL.md`:

```md
## Conversational Review Requirement

Before committing, produce a short review summary and ask the user whether to proceed if any medium/high-risk issues remain.

If all checks pass and only low-risk/deferred issues remain, the user may simply say `commit` or `proceed` and the AI may create the commit.

Do not turn safe-commit into a silent black box. It should create evidence for AI_LOG.md: checks run, browser verification, CodeRabbit/code review findings, triage decisions, and final commit message.
```

---

## Expected user workflow

After this addendum is applied, the user's entire workflow can stay short:

```text
start part 1
[review options, choose one in the user's own words]
proceed
challenge
commit

start part 2
[review options, choose one in the user's own words]
proceed
challenge
commit

start part 3
[review options, choose one in the user's own words]
proceed
commit

finalize
```

The point of keeping the chosen direction in the user's own words is that the transcript should reflect the candidate's actual judgment, not a pre-staged answer.

---

## What good AI_LOG.md evidence looks like

The transcript should show:

```text
The AI presented options.
The user chose a direction.
The AI implemented the approved direction.
The user asked for challenge/review.
The AI found risks.
The user accepted/deferred/rejected findings.
The AI ran verification before commit.
```

That is the evaluation signal: not fancy prompting, but structured human judgment.
