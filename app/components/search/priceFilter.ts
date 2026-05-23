import { formatDollars } from "@/lib/formatters.tsx";

export const PRICE_FILTER_MIN = 10;
export const PRICE_FILTER_NO_MAX_UI_VALUE = 250;
export const PRICE_FILTER_STEP = 5;
export const DEFAULT_PRICE_RANGE: [number, number] = [
  PRICE_FILTER_MIN,
  PRICE_FILTER_NO_MAX_UI_VALUE,
];

export const toSearchPriceMax = (maxPrice: number): number | null => {
  return maxPrice === PRICE_FILTER_NO_MAX_UI_VALUE ? null : maxPrice;
};

export const formatPriceRangeLabel = (
  minPrice: number,
  maxPrice: number,
): string => {
  const formattedMax =
    maxPrice === PRICE_FILTER_NO_MAX_UI_VALUE
      ? "Any"
      : formatDollars(maxPrice);

  return `${formatDollars(minPrice)} to ${formattedMax}`;
};
