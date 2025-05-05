"use client";
import { useState } from "react";
import { LogbookDisplay } from "./components/LogobookDisplay";
import { SelectionForm } from "./components/SelectionForm";
import { Vehicle } from "./types";

export default function Home() {
  const [logbookContent, setLogbookContent] = useState("");
  const [returnedVehicle, setReturnedVehicle] = useState<Vehicle | undefined>();

  return (
    <div className="flex flex-col bg-white text-black items-center justify-center h-screen font-[family-name:var(--font-geist-sans)] gap-5 pb-10">
      <div>
        <h1 className="font-semibold text-lg text-center">
          AutoGrab: Code Challenge
        </h1>
        <p className="text-muted text-sm text-center">Corey Santarossa</p>
      </div>
      <div className="flex w-full h-[450px] gap-20 justify-center items-start pt-10">
        <SelectionForm
          setLogbookContent={setLogbookContent}
          setVehicleData={setReturnedVehicle}
        />
        <LogbookDisplay
          logbookContent={logbookContent}
          returnedVehicle={returnedVehicle}
        />
      </div>
    </div>
  );
}
