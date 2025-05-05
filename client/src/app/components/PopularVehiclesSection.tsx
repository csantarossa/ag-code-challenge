"use client";
import React from "react";
import { Make, Model, Badge, PopularMake } from "../types";
import { POPULAR_VEHICLES } from "../data";

export const PopularVehicles = (props: {
  handleSelectedVehicle: (make: Make, model: Model, badge: Badge) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="text-sm font-medium">Popular Vehicles</h1>
      {Object.keys(POPULAR_VEHICLES).map((vehicle, index) => {
        const make = vehicle as PopularMake;
        const model = Object.keys(POPULAR_VEHICLES[make])[0] as Model;
        const badge = POPULAR_VEHICLES[make][model][0] as Badge;

        return (
          <button
            type="button"
            className="hover:bg-gray-50"
            key={index}
            onClick={() => props.handleSelectedVehicle(make, model, badge)}
          >
            {make} {model} {badge}
          </button>
        );
      })}
    </div>
  );
};
