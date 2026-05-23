# Part 2 Search Card Label Removal QA

App URL: http://localhost:3000/

Recording/replay: unavailable: Browser plugin recording/trace support was not exposed; Chrome CDP rendered screenshots and appshot text were generated.

| Scenario | Expected | Observed | Status |
| --- | --- | --- | --- |
| discounted card without normal-total label | Discounted card keeps struck-through original total and green discounted estimated total, without normal-total label or discount copy. | Nissan Rogue / Year / 2021 / Class / SUV / Passengers / 5 / Doors / 5 / $58/hr / $2,784 / $2,310.72 / estimated total / Book now | PASS |

Line-through check: PASS ($2,784)
Normal-total label absent: PASS

Artifacts:
- artifacts/browser-qa/part2-light-search-card/02-discounted-card.png
- artifacts/browser-qa/part2-light-search-card/02-discounted-card.appshot.txt
