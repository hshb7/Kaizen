export type SearchSortBy = "recommended" | "price-asc" | "price-desc";

export interface SortableSearchResult {
  quote: {
    totalPriceCents: number;
  };
}

export function sortVehicleSearchResults<T extends SortableSearchResult>(
  results: T[],
  sortBy: SearchSortBy,
) {
  if (sortBy === "recommended") {
    return results;
  }

  return [...results].sort((a, b) => {
    const priceDifference =
      a.quote.totalPriceCents - b.quote.totalPriceCents;

    return sortBy === "price-asc" ? priceDifference : -priceDifference;
  });
}
