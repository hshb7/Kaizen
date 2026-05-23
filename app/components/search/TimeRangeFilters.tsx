import { FormValues } from "@/components/search/form.tsx";
import { Button } from "@/components/shared/ui/button";
import { Calendar } from "@/components/shared/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/shared/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/ui/select";
import { cn } from "@/lib/classnames.ts";
import { addMinutes, format, isBefore, isSameDay, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useFormContext } from "react-hook-form";

function getTimeOptions(startDate: Date) {
  const start = startOfDay(startDate);
  return Array.from({ length: 96 }, (_, i) => {
    const date = addMinutes(start, i * 15);

    const value = format(date, "HH:mm");
    const label = format(date, "p");

    const now = new Date();
    const isToday = isSameDay(startDate, now);
    const isDisabled = isToday && isBefore(date, now);

    return { value, label, isDisabled };
  });
}

export function TimeRangeFilters() {
  const form = useFormContext<FormValues>();
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [draftDateRange, setDraftDateRange] = useState<DateRange>();

  const startTimeOptions = useMemo(
    () => getTimeOptions(startDate),
    [startDate],
  );
  const endTimeOptions = useMemo(() => getTimeOptions(endDate), [endDate]);
  const selectedDateRange = isDateRangeOpen
    ? draftDateRange
    : {
        from: startDate,
        to: endDate,
      };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reservation dates</FormLabel>
            <FormControl>
              <Popover
                open={isDateRangeOpen}
                onOpenChange={(isOpen) => {
                  setIsDateRangeOpen(isOpen);
                  if (!isOpen) {
                    setDraftDateRange(undefined);
                  }
                }}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex w-full gap-4 pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {startDate && endDate ? (
                        `${format(startDate, "LLL d, yyyy")} - ${format(
                          endDate,
                          "LLL d, yyyy",
                        )}`
                      ) : (
                        <span>Pick reservation dates</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={selectedDateRange}
                    onSelect={(range) => {
                      setDraftDateRange(range);

                      if (range?.from) {
                        field.onChange(range.from);
                        if (isBefore(endDate, range.from)) {
                          form.setValue("endDate", range.from);
                        }
                      }

                      if (range?.to) {
                        form.setValue("endDate", range.to);
                        setDraftDateRange(undefined);
                        setIsDateRangeOpen(false);
                      }
                    }}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="startTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pick-up time</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {startTimeOptions.map((time) => (
                    <SelectItem
                      key={time.value}
                      value={time.value}
                      disabled={time.isDisabled}
                    >
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="endTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Drop-off time</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {endTimeOptions.map((time) => (
                    <SelectItem
                      key={time.value}
                      value={time.value}
                      disabled={time.isDisabled}
                    >
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
