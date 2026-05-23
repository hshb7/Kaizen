import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { sortVehicleSearchResults } from "./searchSort";

const results = [
  { id: "recommended-first", quote: { totalPriceCents: 3000 } },
  { id: "cheapest", quote: { totalPriceCents: 1000 } },
  { id: "middle", quote: { totalPriceCents: 2000 } },
];

describe("sortVehicleSearchResults", () => {
  it("preserves API order for recommended sort", () => {
    const sorted = sortVehicleSearchResults(results, "recommended");

    assert.deepEqual(
      sorted.map((result) => result.id),
      ["recommended-first", "cheapest", "middle"],
    );
  });

  it("sorts by estimated quote total from low to high", () => {
    const sorted = sortVehicleSearchResults(results, "price-asc");

    assert.deepEqual(
      sorted.map((result) => result.id),
      ["cheapest", "middle", "recommended-first"],
    );
  });

  it("sorts by estimated quote total from high to low", () => {
    const sorted = sortVehicleSearchResults(results, "price-desc");

    assert.deepEqual(
      sorted.map((result) => result.id),
      ["recommended-first", "middle", "cheapest"],
    );
  });
});
