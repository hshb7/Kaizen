---
name: codebase-onboarding
description: Use when entering an unfamiliar repo or before implementing a feature. Maps architecture, commands, data flow, and likely files without editing.
---

# Codebase Onboarding

Do not edit files.

Goal: build a working mental model before implementation.

Steps:
1. Inspect package/config files first.
2. Identify build, type-check, lint, test, and dev commands.
3. Map major folders and app architecture.
4. Identify files likely relevant to the user's task.
5. Trace relevant data flow from UI to server/data layer.
6. Identify business logic ownership.
7. Identify risky or ambiguous areas.
8. Produce a scoped next step.

Output:
- relevant commands
- folder map
- file ownership map
- data flow
- high-risk files
- assumptions and unknowns
- suggested next action

Rules:
- cite file paths
- mark guesses clearly
- do not propose code unless asked
