# Part 1 Browser QA

App URL: http://localhost:3000

Recording: unavailable: current Codex in-app browser capabilities exposed screenshot/appshot capture but no trace/video/replay recorder in this session

| Scenario | Actions | Expected | Observed | Status | Evidence |
| --- | --- | --- | --- | --- | --- |
| Default search state | Open local app at / and observe default price filter/results. | Label is $10 to Any; expensive vehicles can appear when otherwise available. | label=$10 to Any; min=10; max=250; expensive=true; prices=$160/hr, $58/hr, $72/hr, $56/hr, $220/hr, $70/hr, $80/hr, $85/hr | PASS | screenshot: artifacts/browser-qa/part1-price-filter/01-default-any.png<br>appshot: artifacts/browser-qa/part1-price-filter/01-default-any.appshot.txt |
| Real $100/hr max | Click the Maximum price slider in the visible DOM and send ArrowLeft keypresses until max reaches 100. | Label is $10 to $100; vehicles above $100/hr are hidden. | label=$10 to $100; min=10; max=100; expensive=false; prices=$58/hr, $72/hr, $56/hr, $70/hr, $80/hr, $85/hr | PASS | screenshot: artifacts/browser-qa/part1-price-filter/02-max-100.png<br>appshot: artifacts/browser-qa/part1-price-filter/02-max-100.appshot.txt |
| Real $125/hr max | Send five ArrowRight keypresses from the $100 state to set maximum to $125. | Label is $10 to $125; vehicles above $125/hr are hidden. | label=$10 to $125; min=10; max=125; expensive=false; prices=$58/hr, $72/hr, $56/hr, $70/hr, $80/hr, $85/hr | PASS | screenshot: artifacts/browser-qa/part1-price-filter/03-max-125.png<br>appshot: artifacts/browser-qa/part1-price-filter/03-max-125.appshot.txt |
| Return to unbounded Any | Send ArrowRight keypresses until the maximum reaches the top Any state. | Label is $10 to Any; expensive vehicles appear again when otherwise available. | label=$10 to Any; min=10; max=250; expensive=true; prices=$160/hr, $58/hr, $72/hr, $56/hr, $220/hr, $70/hr, $80/hr, $85/hr | PASS | screenshot: artifacts/browser-qa/part1-price-filter/04-return-any.png<br>appshot: artifacts/browser-qa/part1-price-filter/04-return-any.appshot.txt |
