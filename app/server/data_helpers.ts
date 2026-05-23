import { DateTime } from "luxon";
import {
  Reservation,
  RESERVATIONS,
  RESERVATIONS_BY_VEHICLE_ID,
  Vehicle,
  VEHICLES,
} from "./data";

export const getVehicleById = (id: string): Vehicle | undefined => {
  return VEHICLES.find((car) => car.id === id);
};

export const getReservationById = (id: string): Reservation | undefined => {
  return RESERVATIONS.find((reservation) => reservation.id === id);
};

export const getAvailableVehicles = ({
  startTime,
  endTime,
  passengerCount,
  classifications,
  makes,
  priceMinDollars,
  priceMaxDollars,
}: {
  startTime: DateTime;
  endTime: DateTime;
  passengerCount: number;
  classifications: string[];
  makes: string[];
  priceMinDollars: number;
  priceMaxDollars: number | null;
}) => {
  return VEHICLES.filter((car) => {
    const reservations = RESERVATIONS_BY_VEHICLE_ID[car.id] ?? [];

    const isAvailableWithinTimeRange = reservations.every((reservation) => {
      return (
        reservation.start_time > endTime || reservation.end_time < startTime
      );
    });

    const matchesMinPrice = car.hourly_rate_cents >= priceMinDollars * 100;
    const matchesMaxPrice =
      priceMaxDollars === null ||
      car.hourly_rate_cents <= priceMaxDollars * 100;
    const matchesPrice = matchesMinPrice && matchesMaxPrice;

    const matchesClassification =
      classifications.length === 0 ||
      classifications.includes(car.classification);

    const matchesMake = makes.length === 0 || makes.includes(car.make);

    const matchesPassengerCount = car.max_passengers >= passengerCount;

    return (
      isAvailableWithinTimeRange &&
      matchesPrice &&
      matchesClassification &&
      matchesMake &&
      matchesPassengerCount
    );
  });
};

export const getVehicles = () => {
  return VEHICLES;
};
