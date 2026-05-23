import { combineDateTime, FormValues } from "@/components/search/form.tsx";
import { toSearchPriceMax } from "@/components/search/priceFilter.ts";
import {
  SearchSortBy,
  sortVehicleSearchResults,
} from "@/components/search/searchSort";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/ui/select";
import { API } from "@/server/api";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { VehicleListItem } from "./VehicleListItem";

export function VehicleList() {
  const form = useFormContext<FormValues>();
  const startDate = form.watch("startDate");
  const startTime = form.watch("startTime");
  const endDate = form.watch("endDate");
  const endTime = form.watch("endTime");
  const minPassengers = form.watch("minPassengers");
  const classifications = form.watch("classification");
  const makes = form.watch("make");
  const price = form.watch("price");
  const sortBy = form.watch("sortBy");

  const startDateTime = useMemo(
    () => combineDateTime(startDate, startTime),
    [startDate, startTime],
  );
  const endDateTime = useMemo(
    () => combineDateTime(endDate, endTime),
    [endDate, endTime],
  );

  const searchResponse = API.searchVehicles({
    startTime: startDateTime.toISOString(),
    endTime: endDateTime.toISOString(),
    passengerCount: Number(minPassengers),
    classifications,
    makes,
    priceMin: price[0],
    priceMax: toSearchPriceMax(price[1]),
  });

  if (searchResponse.vehicles.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-muted-foreground">
          No vehicles found. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  const vehicleResults = searchResponse.vehicles.map((vehicle) => ({
    vehicle,
    quote: API.getQuote({
      vehicleId: vehicle.id,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
    }),
  }));
  const sortedVehicleResults = sortVehicleSearchResults(
    vehicleResults,
    sortBy,
  );

  return (
    <div>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          {sortedVehicleResults.length} vehicles available
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort</span>
          <Select
            value={sortBy}
            onValueChange={(value) =>
              form.setValue("sortBy", value as SearchSortBy)
            }
          >
            <SelectTrigger className="w-[12rem]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-asc">Lowest price</SelectItem>
              <SelectItem value="price-desc">Highest price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ul className="space-y-4">
        {sortedVehicleResults.map(({ vehicle, quote }) => (
          <VehicleListItem
            key={vehicle.id}
            vehicle={vehicle}
            quote={quote}
            startDateTime={startDateTime}
            endDateTime={endDateTime}
          />
        ))}
      </ul>
    </div>
  );
}
