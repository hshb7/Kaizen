---
name: feature-truth-table
description: Use before implementing business rules, eligibility, pricing, or edge-case-heavy features. Converts requirements into truth tables, assumptions, invariants, and acceptance checks.
---

# Feature Truth Table

Do not write code yet.

Steps:
1. Separate explicit requirements from assumptions.
2. List ambiguous business-rule interpretations.
3. For each ambiguity, surface the candidate interpretations and ask the user to pick — do not silently default.
4. Create a truth table of inputs and expected outcomes.
5. Define invariants the implementation must preserve.
6. Propose a small API/type shape.
7. Define verification scenarios.

Output:
- requirements
- assumptions
- ambiguities (with candidate interpretations)
- truth table
- invariants
- function/API shape
- verification matrix
- DECISIONS.md notes

Rules:
- for money, prefer cents
- for conflicting rules, calculate candidates independently and let policy choose between them
- do not invent edge-case interpretations on the user's behalf; surface them as ambiguities
- cite the requirement source (assignment artifact, prior decision, user statement) for every claimed requirement
