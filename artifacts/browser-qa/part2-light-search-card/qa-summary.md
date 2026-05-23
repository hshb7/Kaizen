# Part 2 Lightweight Search Card QA

App URL: http://localhost:3000/

Recording/replay: unavailable: Browser plugin recording/trace support was not exposed; Chrome CDP rendered screenshots and appshot text were generated.

| Scenario | Expected | Observed | Status |
| --- | --- | --- | --- |
| default lightweight card | Non-discounted card shows hourly rate first and estimated total without trip duration or discount copy. | Nissan Rogue / Year / 2021 / Class / SUV / Passengers / 5 / Doors / 5 / $58/hr / $1,392 / estimated total / Book now | PASS |
| discounted lightweight card | Discounted card shows hourly rate, struck-through normal total, and green discounted estimated total; discount label/savings and trip-duration copy are absent. | Nissan Rogue / Year / 2021 / Class / SUV / Passengers / 5 / Doors / 5 / $58/hr / $2,784 / normal total / $2,310.72 / estimated total / Book now | PASS |

Line-through check: PASS ($2,784)

Artifacts:
- artifacts/browser-qa/part2-light-search-card/01-default-card.png
- artifacts/browser-qa/part2-light-search-card/01-default-card.appshot.txt
- artifacts/browser-qa/part2-light-search-card/02-discounted-card.png
- artifacts/browser-qa/part2-light-search-card/02-discounted-card.appshot.txt
