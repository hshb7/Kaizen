---
name: browser-qa
description: Use after user-facing changes to verify behavior through the available browser automation. Do not edit code during verification. Trigger for browser QA, visual test, E2E check.
---

# Browser QA

Use the available browser automation for end-to-end verification.

Rules:
- Do not edit code during QA unless explicitly asked or a failing scenario has an obvious small fix.
- Use the running local app.
- Launch or reuse the local app and click through the real user flow as a user.
- Interact with controls naturally where practical; use direct control APIs only when they improve reliability and still verify visible UI state.
- Prefer concrete observations over assumptions.
- Record visible values, labels, and navigation state.
- Capture screenshots/appshots at meaningful states.
- If the browser tooling supports trace/video/replay recording, generate one and record the artifact path.
- If replay/recording is not supported, say so and provide the best available visual artifact path, such as screenshot/appshot artifacts.
- If behavior fails, stop and report the likely cause before suggesting code.

Output format:
- Scenario
- Actions
- Expected
- Observed
- PASS / FAIL / UNCLEAR
- Evidence: screenshot/appshot paths and replay/recording artifact path if available
- Follow-up needed

AI_LOG.md format:
- Scope
- App URL / port
- Artifact path: replay/recording path, or "recording unavailable" plus screenshot/appshot paths
- Scenario table with actions, expected, observed, status
- Notes on any unclear or failed observations

Scenarios are derived from the assignment's own requirements and the diff under test — they should not be encoded in this skill. Prioritize scenarios that cover changed code paths, requirement boundaries, and any cross-screen consistency claims the implementation makes.
