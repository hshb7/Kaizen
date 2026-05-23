# Part 2 Browser QA

App URL: http://localhost:3000/

Recording/replay: unavailable: Browser plugin recording/trace support was not exposed; Chrome CDP was used for rendered screenshots and appshot text without installing dependencies.

| Scenario | Expected | Observed | Status |
| --- | --- | --- | --- |
| default search | Search cards lead with estimated final total and show hourly rate as supporting context, with no discount label for ordinary 24-hour search. | Nissan Rogue / Year / 2021 / Class / SUV / Passengers / 5 / Doors / 5 / $1,392 / estimated total / $58/hr/24 hr / Book now | PASS |
| holiday search | June 15 to June 17 includes June 16 strictly inside; search shows Holiday discount and final total $2,310.72 for Nissan Rogue. | Nissan Rogue / Year / 2021 / Class / SUV / Passengers / 5 / Doors / 5 / $2,310.72 / estimated total / Holiday discount / $58/hr/48 hr / Save $473.28 / Book now | PASS |
| holiday review consistency | Review for the same Nissan holiday trip shows final Total Cost $2,310.72, subtotal $2,784, and Holiday discount -$473.28. | Almost there / Your adventure is about to begin! Please confirm your reservation below. / Nissan Rogue / Year / 2021 / Passengers / 5 / Class / SUV / Reservation Summary / Hourly Rate / $58/hr / Duration / 2 days / Subtotal / $2,784 / Holiday discount / -$473.28 / Total Cost / $2,310.72 / Pick-up / Jun 15, 2026, 8:00:00 PM / Rental period / Drop-off / Jun 17, 2026, 8:00:00 PM / Confirm reservation | PASS |
| long reservation search | June 20 to June 24 is >72 hours with no holiday; search shows Long reservation discount and final total $4,608 for Nissan Rogue. | Nissan Rogue / Year / 2021 / Class / SUV / Passengers / 5 / Doors / 5 / $4,608 / estimated total / Long reservation discount / $58/hr/96 hr / Save $960 / Book now | PASS |
| long reservation review consistency | Review for the same Nissan long trip shows Total Cost $4,608 and Long reservation discount -$960. | Almost there / Your adventure is about to begin! Please confirm your reservation below. / Nissan Rogue / Year / 2021 / Passengers / 5 / Class / SUV / Reservation Summary / Hourly Rate / $58/hr / Duration / 4 days / Subtotal / $5,568 / Long reservation discount / -$960 / Total Cost / $4,608 / Pick-up / Jun 20, 2026, 8:00:00 PM / Rental period / Drop-off / Jun 24, 2026, 8:00:00 PM / Confirm reservation | PASS |

Artifacts:
- artifacts/browser-qa/part2-discounts/01-default-search.png
- artifacts/browser-qa/part2-discounts/01-default-search.appshot.txt
- artifacts/browser-qa/part2-discounts/02-holiday-search.png
- artifacts/browser-qa/part2-discounts/02-holiday-search.appshot.txt
- artifacts/browser-qa/part2-discounts/03-holiday-review.png
- artifacts/browser-qa/part2-discounts/03-holiday-review.appshot.txt
- artifacts/browser-qa/part2-discounts/04-long-search.png
- artifacts/browser-qa/part2-discounts/04-long-search.appshot.txt
- artifacts/browser-qa/part2-discounts/05-long-review.png
- artifacts/browser-qa/part2-discounts/05-long-review.appshot.txt
