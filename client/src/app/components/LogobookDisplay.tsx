"use client";
import React from "react";
import { Vehicle } from "../types";

export const LogbookDisplay = (props: {
  returnedVehicle: Vehicle | undefined;
  logbookContent: string;
}) => {
  return (
    <div className="flex flex-col gap-3 h-full">
      <h1 className="text-sm font-medium">Logbook</h1>
      <div className="w-96 h-full overflow-hidden border border-gray-300 p-3 rounded-lg">
        {props.returnedVehicle && (
          <>
            <p className="text-sm">Make: {props.returnedVehicle.make}</p>
            <p className="text-sm">Model: {props.returnedVehicle.model}</p>
            <p className="text-sm">Badge: {props.returnedVehicle.badge}</p>
          </>
        )}
        <br />
        <p className="whitespace-pre-line text-sm">{props.logbookContent}</p>
      </div>
    </div>
  );
};
