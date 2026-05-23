import { DateTime } from "luxon";

export type DiscountType = "holiday" | "long_reservation";

export interface AppliedDiscount {
  type: DiscountType;
  label: string;
  amountCents: number;
}

export interface ReservationQuote {
  totalPriceCents: number;
  originalTotalPriceCents: number;
  hourlyRateCents: number;
  durationInHours: number;
  discount: AppliedDiscount | null;
}

const HOLIDAY_MONTH_DAYS = new Set([
  "1-21",
  "2-12",
  "3-4",
  "5-2",
  "6-16",
  "7-26",
  "8-3",
  "9-1",
  "11-5",
  "12-18",
]);

const HOLIDAY_DISCOUNT_RATE = 0.17;
const LONG_RESERVATION_THRESHOLD_HOURS = 72;
const LONG_RESERVATION_DISCOUNT_CENTS_PER_HOUR = 1_000;

const monthDayKey = (dateTime: DateTime) =>
  `${dateTime.month}-${dateTime.day}`;

const isHolidayDate = (dateTime: DateTime) =>
  HOLIDAY_MONTH_DAYS.has(monthDayKey(dateTime));

const hasStrictlyInteriorHoliday = (start: DateTime, end: DateTime) => {
  if (isHolidayDate(start) || isHolidayDate(end)) {
    return false;
  }

  let cursor = start.startOf("day").plus({ days: 1 });
  const endDay = end.startOf("day");

  while (cursor < endDay) {
    if (isHolidayDate(cursor)) {
      return true;
    }
    cursor = cursor.plus({ days: 1 });
  }

  return false;
};

const buildHolidayDiscount = (
  originalTotalPriceCents: number,
  start: DateTime,
  end: DateTime,
) => {
  if (!hasStrictlyInteriorHoliday(start, end)) {
    return null;
  }

  const totalPriceCents = Math.round(
    originalTotalPriceCents * (1 - HOLIDAY_DISCOUNT_RATE),
  );

  return {
    totalPriceCents,
    discount: {
      type: "holiday" as const,
      label: "Holiday discount",
      amountCents: originalTotalPriceCents - totalPriceCents,
    },
  };
};

const buildLongReservationDiscount = (
  originalTotalPriceCents: number,
  hourlyRateCents: number,
  durationInHours: number,
) => {
  if (durationInHours <= LONG_RESERVATION_THRESHOLD_HOURS) {
    return null;
  }

  const discountedHourlyRateCents = Math.max(
    0,
    hourlyRateCents - LONG_RESERVATION_DISCOUNT_CENTS_PER_HOUR,
  );
  const totalPriceCents = Math.round(
    discountedHourlyRateCents * durationInHours,
  );

  return {
    totalPriceCents,
    discount: {
      type: "long_reservation" as const,
      label: "Long reservation discount",
      amountCents: originalTotalPriceCents - totalPriceCents,
    },
  };
};

export const calculateReservationQuote = (
  start: DateTime,
  end: DateTime,
  hourlyRateCents: number,
): ReservationQuote => {
  const durationInHours = end.diff(start, "hours").hours || 0;
  const originalTotalPriceCents = Math.round(hourlyRateCents * durationInHours);

  const discountCandidates = [
    buildHolidayDiscount(originalTotalPriceCents, start, end),
    buildLongReservationDiscount(
      originalTotalPriceCents,
      hourlyRateCents,
      durationInHours,
    ),
  ].filter((candidate) => candidate !== null);

  const bestDiscount = discountCandidates.sort(
    (a, b) => a.totalPriceCents - b.totalPriceCents,
  )[0];

  return {
    totalPriceCents: bestDiscount?.totalPriceCents ?? originalTotalPriceCents,
    originalTotalPriceCents,
    hourlyRateCents,
    durationInHours,
    discount: bestDiscount?.discount ?? null,
  };
};
