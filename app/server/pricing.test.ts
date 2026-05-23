import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { API } from "./api";

const quoteFor = (vehicleId: string, startTime: string, endTime: string) =>
  API.getQuote({ vehicleId, startTime, endTime });

describe("reservation pricing", () => {
  it("keeps undiscounted reservations at hourly rate times duration", () => {
    const quote = quoteFor(
      "5",
      "2026-01-10T10:00:00.000Z",
      "2026-01-11T10:00:00.000Z",
    );

    assert.equal(quote.totalPriceCents, 139_200);
    assert.equal(quote.originalTotalPriceCents, 139_200);
    assert.equal(quote.discount, null);
  });

  it("applies the holiday discount only when a holiday date is strictly inside the reservation", () => {
    const insideHoliday = quoteFor(
      "5",
      "2026-05-01T10:00:00.000Z",
      "2026-05-03T10:00:00.000Z",
    );
    const startsOnHoliday = quoteFor(
      "5",
      "2026-05-02T10:00:00.000Z",
      "2026-05-04T10:00:00.000Z",
    );
    const endsOnHoliday = quoteFor(
      "5",
      "2026-04-30T10:00:00.000Z",
      "2026-05-02T10:00:00.000Z",
    );

    assert.equal(insideHoliday.totalPriceCents, 231_072);
    assert.equal(insideHoliday.discount?.type, "holiday");
    assert.equal(startsOnHoliday.totalPriceCents, 278_400);
    assert.equal(startsOnHoliday.discount, null);
    assert.equal(endsOnHoliday.totalPriceCents, 278_400);
    assert.equal(endsOnHoliday.discount, null);
  });

  it("applies the long reservation discount only when duration is greater than 72 hours", () => {
    const exactlyThreeDays = quoteFor(
      "5",
      "2026-01-10T10:00:00.000Z",
      "2026-01-13T10:00:00.000Z",
    );
    const moreThanThreeDays = quoteFor(
      "5",
      "2026-01-10T10:00:00.000Z",
      "2026-01-13T11:00:00.000Z",
    );

    assert.equal(exactlyThreeDays.totalPriceCents, 417_600);
    assert.equal(exactlyThreeDays.discount, null);
    assert.equal(moreThanThreeDays.totalPriceCents, 350_400);
    assert.equal(moreThanThreeDays.discount?.type, "long_reservation");
  });

  it("does not stack discounts and chooses the lower final price", () => {
    const highRateHolidayTrip = quoteFor(
      "8",
      "2026-05-01T10:00:00.000Z",
      "2026-05-04T11:00:00.000Z",
    );
    const lowerRateHolidayTrip = quoteFor(
      "5",
      "2026-05-01T10:00:00.000Z",
      "2026-05-04T11:00:00.000Z",
    );

    assert.equal(highRateHolidayTrip.totalPriceCents, 1_332_980);
    assert.equal(highRateHolidayTrip.discount?.type, "holiday");
    assert.equal(lowerRateHolidayTrip.totalPriceCents, 350_400);
    assert.equal(lowerRateHolidayTrip.discount?.type, "long_reservation");
  });
});
