"use client";
import React from "react";
import { Vehicle } from "../types";

export const LogbookDisplay = (props: {
  vehicleData: Vehicle | undefined;
  logbookContent: string;
}) => {
  const vehicleExtracted = {
    make: props.vehicleData?.make,
    model: props.vehicleData?.model,
    badge: props.vehicleData?.badge,
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <h1 className="text-sm font-medium">Logbook</h1>
      <div className="w-96 h-full overflow-hidden border border-gray-300 p-3 rounded-lg">
        {props.vehicleData && (
          <>
            <p className="text-sm">Make: {vehicleExtracted.make}</p>
            <p className="text-sm">Model: {vehicleExtracted.model}</p>
            <p className="text-sm">Badge: {vehicleExtracted.badge}</p>
          </>
        )}
        <br />
        <p className="whitespace-pre-line text-sm">{props.logbookContent}</p>
      </div>
    </div>
  );
};
