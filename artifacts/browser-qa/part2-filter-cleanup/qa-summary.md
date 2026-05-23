# Part 2 Filter Cleanup Browser QA

App URL: `http://localhost:3000/`

Recording/replay: unavailable through the exposed browser tooling in this session. Evidence captured as screenshots plus appshot JSON under `artifacts/browser-qa/part2-filter-cleanup/`.

| Scenario | Actions | Expected | Observed | Status | Evidence |
| --- | --- | --- | --- | --- | --- |
| Default cleaner controls | Loaded the search page. | Separate pickup/drop-off date fields are replaced by one reservation date range control; class/make render as compact dropdowns; separate exact price/passenger inputs are absent. | Top bar showed `Reservation dates`, `Pick-up time`, and `Drop-off time`; `Pick-up date`, `Drop-off date`, `Exact max price`, and `Exact minimum passengers` labels were absent. Class/make closed states showed `Any class` and `Any make`. | PASS | `01-default-clean-controls.png`, `01-default-clean-controls.appshot.json` |
| Class dropdown | Opened class dropdown and selected `SUV`. | Menu item shows a checkmark state, closed control summarizes the selection, and results narrow to SUVs. | `SUV` menu item was checked; closed state showed `SUV`; 4 vehicles rendered and all were SUVs. | PASS | `02-class-dropdown-suv.png`, `02-class-dropdown-suv.appshot.json` |
| Make dropdown | Opened make dropdown and selected `Nissan`. | Menu item shows a checkmark state, closed control summarizes the selection, and results narrow to Nissan. | `Nissan` menu item was checked; closed state showed `Nissan`; one Nissan Rogue result rendered. | PASS | `03-make-dropdown-nissan.png`, `03-make-dropdown-nissan.appshot.json` |
| Inline max price editing | Clicked visible `Any` max price value and typed `100`. | Slider/query state update without a separate exact input row. | Closed price value changed to `$100`; max slider value was `100`; 6 vehicles rendered and vehicles above `$100/hr` were absent. | PASS | `04-inline-price-max-100.png`, `04-inline-price-max-100.appshot.json` |
| Inline passenger editing | Clicked visible passenger count and typed `7`. | Slider/query state update without a separate passenger input row. | Passenger value changed to `7`; passenger slider value was `7`; results showed only vehicles with at least 7 passengers. | PASS | `05-inline-passengers-7.png`, `05-inline-passengers-7.appshot.json` |
| Date range picker | Opened reservation dates and selected May 24-May 26 in the calendar. | One calendar interaction updates both reservation dates; separate date fields stay absent. | Closed date range showed `May 24, 2026 - May 26, 2026`; `Pick-up date` and `Drop-off date` labels stayed absent. | PASS | `06-date-range-picker.png`, `06-date-range-picker.appshot.json` |

