---
name: writeup-integrity
description: Use when drafting AI_LOG.md, DECISIONS.md, final writeups, verification summaries, tradeoffs, or documentation. Uses facts only and avoids inventing tests or outcomes.
---

# Writeup Integrity

Use facts only.

Steps:
1. Inspect actual code changes.
2. Inspect actual commands/checks run.
3. Separate facts from assumptions.
4. Draft concise sections.
5. Do not claim tests/checks passed unless they actually ran.
6. Preserve uncertainty and timebox tradeoffs.
7. Make the writing clear enough for a reviewer to audit.

Output:
- DECISIONS.md draft/update
- AI_LOG.md summary/update
- claims that need confirmation
- suggested missing verification

Rules:
- never invent tests
- never hide AI involvement
- never overstate completeness
- prefer candid tradeoffs over fake polish
