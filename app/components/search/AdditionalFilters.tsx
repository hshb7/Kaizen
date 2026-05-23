import { FormValues } from "@/components/search/form.tsx";
import {
  DEFAULT_PRICE_RANGE,
  formatPriceRangeLabel,
  PRICE_FILTER_MIN,
  PRICE_FILTER_NO_MAX_UI_VALUE,
  PRICE_FILTER_STEP,
} from "@/components/search/priceFilter.ts";
import { Button } from "@/components/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/shared/ui/dropdown-menu";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/ui/form";
import { Input } from "@/components/shared/ui/input";
import { RangeSlider, Slider } from "@/components/shared/ui/slider";
import { FilterOptions } from "@/server/api";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const summarizeSelections = (
  selectedValues: string[],
  emptyLabel: string,
) => {
  if (selectedValues.length === 0) {
    return emptyLabel;
  }

  if (selectedValues.length <= 2) {
    return selectedValues.join(", ");
  }

  return `${selectedValues.length} selected`;
};

export function AdditionalFilters({ filterOptions }: { filterOptions: FilterOptions }) {
  const form = useFormContext<FormValues>();
  const [editingPriceBoundary, setEditingPriceBoundary] = useState<
    "min" | "max" | null
  >(null);
  const [isEditingPassengers, setIsEditingPassengers] = useState(false);

  const price = form.watch("price");
  const minPrice = price[0];
  const maxPrice = price[1];
  const minPassengers = form.watch("minPassengers");
  const classifications = form.watch("classification");
  const makes = form.watch("make");
  const sortBy = form.watch("sortBy");
  const isDefaultState =
    minPassengers === 1 &&
    classifications.length === 0 &&
    makes.length === 0 &&
    price[0] === DEFAULT_PRICE_RANGE[0] &&
    price[1] === DEFAULT_PRICE_RANGE[1] &&
    sortBy === "recommended";

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-semibold">Filters</h3>
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <div className="flex w-full items-baseline justify-between mb-4">
              <FormLabel>Price</FormLabel>
              <div className="flex items-center gap-1 text-sm">
                {editingPriceBoundary === "min" ? (
                  <Input
                    autoFocus
                    className="h-8 w-20"
                    type="number"
                    inputMode="numeric"
                    min={PRICE_FILTER_MIN}
                    max={maxPrice}
                    step={1}
                    value={minPrice}
                    onBlur={() => setEditingPriceBoundary(null)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === "Escape") {
                        setEditingPriceBoundary(null);
                      }
                    }}
                    onChange={(event) => {
                      const nextMinPrice = Number(event.target.value);

                      if (Number.isNaN(nextMinPrice)) {
                        return;
                      }

                      field.onChange([
                        clamp(
                          Math.round(nextMinPrice),
                          PRICE_FILTER_MIN,
                          maxPrice,
                        ),
                        maxPrice,
                      ]);
                    }}
                  />
                ) : (
                  <button
                    type="button"
                    className="rounded px-1 font-medium underline-offset-2 hover:underline"
                    onClick={() => setEditingPriceBoundary("min")}
                  >
                    ${minPrice}
                  </button>
                )}
                <span className="text-gray-500">to</span>
                {editingPriceBoundary === "max" ? (
                  <Input
                    autoFocus
                    className="h-8 w-20"
                    type="number"
                    inputMode="numeric"
                    min={minPrice}
                    max={PRICE_FILTER_NO_MAX_UI_VALUE}
                    step={1}
                    placeholder="Any"
                    value={
                      maxPrice === PRICE_FILTER_NO_MAX_UI_VALUE
                        ? ""
                        : maxPrice
                    }
                    onBlur={() => setEditingPriceBoundary(null)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === "Escape") {
                        setEditingPriceBoundary(null);
                      }
                    }}
                    onChange={(event) => {
                      const rawValue = event.target.value;

                      if (rawValue === "") {
                        field.onChange([
                          minPrice,
                          PRICE_FILTER_NO_MAX_UI_VALUE,
                        ]);
                        return;
                      }

                      const nextMaxPrice = Number(rawValue);

                      if (Number.isNaN(nextMaxPrice)) {
                        return;
                      }

                      field.onChange([
                        minPrice,
                        clamp(
                          Math.round(nextMaxPrice),
                          minPrice,
                          PRICE_FILTER_NO_MAX_UI_VALUE,
                        ),
                      ]);
                    }}
                  />
                ) : (
                  <button
                    type="button"
                    className="rounded px-1 font-medium underline-offset-2 hover:underline"
                    onClick={() => setEditingPriceBoundary("max")}
                  >
                    {maxPrice === PRICE_FILTER_NO_MAX_UI_VALUE
                      ? "Any"
                      : `$${maxPrice}`}
                  </button>
                )}
              </div>
            </div>
            <FormControl>
              <RangeSlider
                min={PRICE_FILTER_MIN}
                max={PRICE_FILTER_NO_MAX_UI_VALUE}
                step={PRICE_FILTER_STEP}
                value={field.value}
                onValueChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="minPassengers"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <div className="flex w-full items-baseline justify-between mb-4">
              <FormLabel>Passengers</FormLabel>
              {isEditingPassengers ? (
                <Input
                  autoFocus
                  className="h-8 w-16"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={10}
                  step={1}
                  value={field.value}
                  onBlur={() => setIsEditingPassengers(false)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === "Escape") {
                      setIsEditingPassengers(false);
                    }
                  }}
                  onChange={(event) => {
                    const nextPassengerCount = Number(event.target.value);

                    if (Number.isNaN(nextPassengerCount)) {
                      return;
                    }

                    field.onChange(
                      clamp(Math.round(nextPassengerCount), 1, 10),
                    );
                  }}
                />
              ) : (
                <button
                  type="button"
                  className="rounded px-1 text-sm font-medium underline-offset-2 hover:underline"
                  onClick={() => setIsEditingPassengers(true)}
                >
                  {field.value}
                </button>
              )}
            </div>
            <FormControl>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="classification"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Class</FormLabel>
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between"
                  >
                    <span className="truncate">
                      {summarizeSelections(field.value, "Any class")}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {filterOptions.classifications.map((classification) => (
                    <DropdownMenuCheckboxItem
                      key={classification}
                      checked={field.value.includes(classification)}
                      onSelect={(event) => event.preventDefault()}
                      onCheckedChange={(checked) => {
                        field.onChange(
                          checked
                            ? [...field.value, classification]
                            : field.value.filter(
                                (value) => value !== classification,
                              ),
                        );
                      }}
                    >
                      {classification}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="make"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Make</FormLabel>
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between"
                  >
                    <span className="truncate">
                      {summarizeSelections(field.value, "Any make")}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {filterOptions.makes.map((make) => (
                    <DropdownMenuCheckboxItem
                      key={make}
                      checked={field.value.includes(make)}
                      onSelect={(event) => event.preventDefault()}
                      onCheckedChange={(checked) => {
                        field.onChange(
                          checked
                            ? [...field.value, make]
                            : field.value.filter((value) => value !== make),
                        );
                      }}
                    >
                      {make}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => {
          form.reset();
        }}
        className="mt-4"
        disabled={isDefaultState}
      >
        Reset all
      </Button>
    </div>
  );
}
