---
name: guided-section-runner
description: Use when the user says start part 1, start part 2, start part 3, challenge, proceed, or asks to work through a take-home section conversationally. Creates decision gates before implementation.
---

# Guided Section Runner

This skill makes the workflow conversational while keeping prompts short.

The user should not need to remember long prompts. When the user starts a section, guide them through the right engineering conversation. Read the assignment's own artifacts in the repo for the specific requirements of each section.

## Modes

### start part 1

Goal: investigate whatever the first assignment section asks for before changing code.

Do not edit code yet.

Steps:
1. Trace the relevant data path end-to-end (UI → state → server → response).
2. Identify defaults, sentinel values, transformations, labels, and conditionals along the path.
3. Explain the finding in plain language with evidence from the repo.
4. Present 2–3 implementation options:
   - fastest patch
   - clean time-boxed fix
   - better production fix
5. Recommend one and name the tradeoff.
6. Define verification.
7. Stop and ask the user to choose.

Decision Gate format:

```text
Decision Gate — Section 1

Finding:
...

Options:
A. ...
B. ...
C. ...

Recommendation:
...

Tradeoff:
...

Verification:
...

Question for you:
Which option do you want to ship, and what tradeoff should DECISIONS.md mention?
```

### start part 2

Goal: design whatever the second assignment section asks for before changing code.

Do not edit code yet.

Steps:
1. Restate the explicit requirements from the assignment artifacts.
2. Separate assumptions from requirements; call out ambiguities.
3. Build a truth table of inputs and expected outcomes.
4. Present implementation options:
   - fastest inline implementation
   - clean centralized helper
   - production-grade service/config approach
5. Recommend an option grounded in the actual codebase, not a default preference.
6. Define tests/browser checks.
7. Stop and ask the user to choose.

Decision Gate format:

```text
Decision Gate — Section 2

Rules:
...

Ambiguities:
...

Truth Table:
...

Options:
A. ...
B. ...
C. ...

Recommendation:
...

Tradeoff:
...

Verification:
...

Question for you:
Which design do you want to own, and what assumption should we document?
```

### start part 3

Goal: refactor the code already shipped by earlier sections.

Do not edit code yet.

Steps:
1. Review the current implementation for duplicated logic, unclear names, weak boundaries, or UI-owned business rules.
2. Present 2–3 refactor options.
3. Recommend the highest-impact, lowest-risk refactor.
4. Stop and ask the user to choose.

Decision Gate format:

```text
Decision Gate — Section 3

Current risk:
...

Options:
A. ...
B. ...
C. ...

Recommendation:
...

Tradeoff:
...

Verification:
...

Question for you:
Which refactor should we ship within the timebox?
```

### challenge

Review the current plan or diff without editing.

Return:
- top risks ranked by hiring impact
- what a senior reviewer might criticize
- what might be overbuilt
- what might be under-verified
- whether the current choice still fits the timebox

### proceed

Implement the currently approved plan only.

Rules:
- Do not broaden scope.
- Do not add dependencies unless already approved.
- Keep the diff surgical.
- After implementation, summarize changed files and verification.
- Do not commit unless the user says commit.

## AI_LOG.md Decision Notes

After each gate, prepare a short note for `AI_LOG.md`:

```md
### Decision Gate — [section]

Options considered:
- A: ...
- B: ...
- C: ...

Chosen direction:
[user choice from transcript]

Reasoning captured:
[only what the user actually said or what the transcript supports]

Verification planned:
- ...
```

Do not fake user reasoning.
