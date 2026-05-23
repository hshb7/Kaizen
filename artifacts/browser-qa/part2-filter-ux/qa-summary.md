# Part 2 Filter UX Browser QA

App URL: `http://localhost:3000/`

Recording/replay: unavailable through the exposed browser tooling in this session. Evidence captured as screenshots plus appshot JSON under `artifacts/browser-qa/part2-filter-ux/`.

| Scenario | Actions | Expected | Observed | Status | Evidence |
| --- | --- | --- | --- | --- | --- |
| Default opt-in filters | Loaded the search page with default dates and filters. | Class and make filters are unchecked by default, but results still render broadly. | All class toggles had `aria-pressed=false`; exact max price input was blank/`Any`; 8 vehicles rendered. | PASS | `01-default-filters.png`, `01-default-filters.appshot.json` |
| SUV class filter | Clicked `SUV`. | Results narrow to SUVs only. | 4 vehicles rendered: Nissan Rogue, Hyundai Santa Fe, Mazda CX-9, Jeep Wrangler; each card class was `SUV`. | PASS | `02-suv-filter.png`, `02-suv-filter.appshot.json` |
| Add another class | Clicked `Compact` while `SUV` remained selected. | Results broaden within selected classes. | 5 vehicles rendered: the four SUVs plus Volkswagen Golf as `Compact`. | PASS | `03-suv-compact-filter.png`, `03-suv-compact-filter.appshot.json` |
| Exact max price | Reset filters, typed `100` in exact max price. | Vehicles above `$100/hr` are hidden and slider stays synced. | 6 vehicles rendered; `$160/hr` Ford and `$220/hr` Mercedes were absent; max slider value was `100`. | PASS | `04-price-max-100.png`, `04-price-max-100.appshot.json` |
| Blank max price restores Any | Cleared exact max price input. | Blank input means `Any` and restores unbounded search. | 8 vehicles rendered again; max slider value returned to `250`; Ford and Mercedes returned. | PASS | `05-price-any-restored.png`, `05-price-any-restored.appshot.json` |
| Exact passenger input | Typed `7` in exact minimum passengers. | Results show vehicles with at least 7 passengers and slider stays synced. | 3 vehicles rendered: Hyundai Santa Fe, Mazda CX-9, Chrysler Pacifica; passenger slider value was `7`. | PASS | `06-passengers-7.png`, `06-passengers-7.appshot.json` |
| Lowest total sort | Reset filters and selected `Lowest price`. | Results sort ascending by estimated trip total. | First results were Volkswagen Golf `$1,344`, Nissan Rogue `$1,392`, Mazda CX-9 `$1,680`, Hyundai Santa Fe `$1,728`. | PASS | `07-sort-lowest.png`, `07-sort-lowest.appshot.json` |
| Highest total sort | Selected `Highest price`. | Results sort descending by estimated trip total. | First results were Mercedes-Benz C-Class `$5,280`, Ford Mustang `$3,840`, Jeep Wrangler `$2,040`, Chrysler Pacifica `$1,920`. | PASS | `08-sort-highest.png`, `08-sort-highest.appshot.json` |

Machine-readable run summary: `qa-run.json`.
