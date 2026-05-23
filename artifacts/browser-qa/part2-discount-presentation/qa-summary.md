# Part 2 Discount Presentation QA

App URL: http://localhost:3000/

Recording/replay: unavailable: Browser plugin recording/trace support was not exposed; Chrome CDP rendered screenshots and appshot text were generated.

| Scenario | Expected | Observed | Status |
| --- | --- | --- | --- |
| default card hierarchy | Non-discounted search card shows hourly rate first, then estimated total without discount copy. | Nissan Rogue / Year / 2021 / Class / SUV / Passengers / 5 / Doors / 5 / $58/hr / 24 hr trip / $1,392 / estimated total / Book now | PASS |
| discounted card hierarchy | Discounted search card shows hourly rate first, discounted total next, original total struck through, then discount label and savings. | Nissan Rogue / Year / 2021 / Class / SUV / Passengers / 5 / Doors / 5 / $58/hr / 48 hr trip / $2,310.72 / estimated total / $2,784 normal total / Holiday discount - Save $473.28 / Book now | PASS |

Line-through check: PASS ($2,784)

Artifacts:
- artifacts/browser-qa/part2-discount-presentation/01-default-card.png
- artifacts/browser-qa/part2-discount-presentation/01-default-card.appshot.txt
- artifacts/browser-qa/part2-discount-presentation/02-holiday-card.png
- artifacts/browser-qa/part2-discount-presentation/02-holiday-card.appshot.txt
