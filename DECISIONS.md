# Decisions

## Part 1 — Price Filter Bug

Root cause:
The search price filter used `$100` as both a real customer-selected maximum and as an internal "no maximum" sentinel. The UI labeled that state as `$100+`, and the API converted `priceMax === 100` into an unbounded max, so users could not express a real `$100/hr` ceiling.

Fix:
The search API now treats `priceMax: null` as unbounded, while every numeric `priceMax` is a real ceiling. The slider still uses a numeric top value for its UI-only "Any" state, but `VehicleList` converts that value to `null` before calling `API.searchVehicles`.

Tradeoff:
This is a cleaner API contract than introducing another server-side sentinel, but the UI still needs a numeric adapter because the range slider emits numbers. In a production HTTP API, `null`, omitted, empty string, and string `"null"` should be parsed explicitly so unbounded and invalid states cannot be confused.

## Part 2 — Discounts

Implementation:
Reservation pricing now flows through a shared quote helper in `app/server/pricing.ts`. `API.getQuote` delegates to that helper, search cards call `API.getQuote` for each listed vehicle, and review renders the same quote shape, so discount selection and totals are not independently calculated in UI components.

Assumptions:
- "More than 3 days" means strictly greater than 72 hours; exactly 72 hours does not qualify for the long-reservation discount.
- Holiday matching uses fictional month/day holidays and applies only when a holiday date is strictly between the pickup and dropoff calendar dates.
- If pickup or dropoff is on the holiday date, the holiday discount does not apply.
- The holiday discount is 17% off the original total, rounded to the nearest cent.
- The long-reservation discount is `$10/hr` off the hourly rate for the full reservation.
- Discounts are computed independently and do not stack; when both are eligible, the quote chooses the lower final price.

Search pricing UX:
The search result card was starting to carry too much checkout-level detail. For search, the primary job is comparison, not a full receipt. I simplified the card so users see the hourly rate first, then the trip-total comparison. When a discount applies, the normal total is represented by the struck-through original total and the discounted estimated total is emphasized. Detailed discount labels and savings explanations stay on the review page, where the user is evaluating the final reservation breakdown.

Filter UX:
- Search filters use opt-in class/make semantics: no class or make selected means no class/make restriction, while selecting one or more values narrows the results.
- Search sorting supports recommended order plus lowest/highest estimated trip total. "Most popular" was deferred because the repo does not include a real popularity, rating, or booking-demand signal.
- Search uses one reservation date-range picker for pickup/drop-off dates while keeping pickup/drop-off time separate.
- The old class and make filter model required users to manually uncheck too many options. Compact checkbox dropdowns keep the sidebar smaller while preserving multi-select behavior.
- Price and passenger filters keep sliders for quick adjustments, but precision editing is inline on the displayed values. This lets users type exact constraints without adding more always-visible controls.
- Confirmation is intentionally local UI state for this take-home: clicking confirm shows clear success or failure feedback, but does not attempt payment processing or persistence because the repo does not include those APIs.

## Part 3 — Refactor

What changed and why:
The main refactor was centralizing reservation pricing in `app/server/pricing.ts` instead of letting search and review components calculate totals independently. That helper owns duration, subtotal, discount eligibility, discount selection, final total, and discount metadata. `API.getQuote` delegates to it, and both search results and the review page consume the same quote shape.

This keeps the highest-risk business rules out of presentation components. Search cards decide how much pricing context to show, and review decides how to show the detailed breakdown, but neither component reimplements holiday logic, long-reservation logic, rounding, or discount conflict resolution.

I also added small focused helpers around search UI behavior, such as the price-filter adapter and quote-total sorting helper. Those are intentionally narrow: they make the current behavior easier to test without turning the take-home into a broader rewrite.

Tradeoff:
The quote helper is still called through the in-memory API layer, so this is not a production reservation service boundary. With more time, I would make the quote contract the only pricing source for search, review, confirmation, and any future HTTP API, then add stronger integration tests around that boundary.

## Verification

I verified:
- `npm run ts` passed.
- Direct API checks passed for `priceMax: 100`, `priceMax: 125`, and `priceMax: null`.
- Browser QA passed for default `Any`, `$100/hr`, `$125/hr`, and returning to `Any`.
- `node --import tsx --test app/server/pricing.test.ts` passed for no discount, holiday discount, holiday boundary exclusions, exactly 72 hours, more than 72 hours, and conflicting discounts.
- Browser QA passed for Part 2 default search pricing, holiday discount search/review consistency, and long-reservation discount search/review consistency. Artifacts are in `artifacts/browser-qa/part2-discounts/`.
- `node --import tsx --test app/server/data_helpers.test.ts app/components/search/searchSort.test.ts app/server/pricing.test.ts` passed for filter semantics, quote-total sorting, and pricing rules.
- Browser QA passed for opt-in filter semantics, lowest/highest estimated trip total sorting, the cleaned-up date-range picker, compact class/make dropdowns, and inline price/passenger editing. Artifacts are in `artifacts/browser-qa/part2-filter-ux/` and `artifacts/browser-qa/part2-filter-cleanup/`.
- Browser QA passed for review confirmation feedback after clicking through from search to review. Artifacts are in `artifacts/browser-qa/part2-review-confirmation/`.

## If I Had Another 30 Minutes

Product follow-ups:
- Add a fuel type filter if the inventory data includes fuel type or EV/hybrid attributes.
- Add pickup location search so availability can reflect where the customer actually wants to rent from.
- Add a focused brand or tier search path for users who already know they want a specific make, brand, or vehicle tier.
