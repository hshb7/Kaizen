import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DateTime } from "luxon";
import { getAvailableVehicles } from "./data_helpers";

const searchInput = {
  startTime: DateTime.fromISO("2026-10-01T10:00:00.000Z"),
  endTime: DateTime.fromISO("2026-10-02T10:00:00.000Z"),
  passengerCount: 1,
  priceMinDollars: 10,
  priceMaxDollars: null,
};

describe("getAvailableVehicles filter semantics", () => {
  it("treats empty class and make selections as no class or make filter", () => {
    const vehicles = getAvailableVehicles({
      ...searchInput,
      classifications: [],
      makes: [],
    });

    assert.ok(vehicles.length > 1);
  });

  it("filters by selected classes when class selections are present", () => {
    const vehicles = getAvailableVehicles({
      ...searchInput,
      classifications: ["SUV"],
      makes: [],
    });

    assert.ok(vehicles.length > 0);
    assert.ok(vehicles.every((vehicle) => vehicle.classification === "SUV"));
  });

  it("filters by selected makes when make selections are present", () => {
    const vehicles = getAvailableVehicles({
      ...searchInput,
      classifications: [],
      makes: ["Nissan"],
    });

    assert.ok(vehicles.length > 0);
    assert.ok(vehicles.every((vehicle) => vehicle.make === "Nissan"));
  });
});
