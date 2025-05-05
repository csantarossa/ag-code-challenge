import React, { useState } from "react";
import { Badge, Make, Model, Vehicle } from "../types";
import { MODELS } from "../data";
import { Dropdown } from "./VehicleDropdown";
import { FileInput } from "./FileInput";
import { PopularVehicles } from "./PopularVehiclesSection";

export const SelectionForm = (props: {
  setVehicleData: React.Dispatch<React.SetStateAction<Vehicle | undefined>>;
  setLogbookContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [selectedMake, setSelectedMake] = useState<Make | "">("");
  const [selectedModel, setSelectedModel] = useState<Model | "">("");
  const [selectedBadge, setSelectedBadge] = useState<Badge | "">("");
  const [logbookFile, setLogbookFile] = useState<File | null>(null);

  const makes = Object.keys(MODELS) as Make[];
  const models = selectedMake
    ? (Object.keys(MODELS[selectedMake]) as Model[])
    : [];
  const badges =
    selectedMake && selectedModel
      ? (MODELS[selectedMake][selectedModel] as Badge[])
      : [];

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (!logbookFile) {
        alert("You must submit your logbook");
        return;
      }
      formData.append("file", logbookFile);
      formData.append(
        "vehicle",
        JSON.stringify({
          make: selectedMake,
          model: selectedModel,
          badge: selectedBadge,
        })
      );

      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      props.setVehicleData(data.data.vehicleData);
      props.setLogbookContent(data.data.logbook);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMakeChange = (make: Make) => {
    setSelectedMake(make);
    setSelectedModel("");
    setSelectedBadge("");
  };

  const handleModelChange = (model: Model) => {
    setSelectedModel(model);
    setSelectedBadge("");
  };

  const handleBadgeChange = (badge: Badge) => {
    setSelectedBadge(badge);
  };

  const handlePopularVehicleSelection = (
    make: Make,
    model: Model,
    badge: Badge
  ) => {
    setSelectedMake(make);
    setSelectedModel(model);
    setSelectedBadge(badge);
  };

  const showModelDropdown = selectedMake;
  const showBadgeDropdown = selectedMake && selectedModel;
  const showFileUpload = selectedMake && selectedModel && selectedBadge;

  return (
    <div className="h-full">
      <form
        onSubmit={handleSubmission}
        className="flex flex-col h-full w-72 items-center justify-between"
      >
        <div className="flex w-full h-full flex-col gap-3">
          <h1 className="font-medium text-sm">Vehicle Selector</h1>
          <div className="flex w-full h-full flex-col gap-2">
            <Dropdown
              placeholder={"Choose Make"}
              value={selectedMake}
              data={makes}
              handleChange={handleMakeChange}
            />
            {showModelDropdown && (
              <Dropdown
                placeholder={"Choose Model"}
                value={selectedModel}
                data={models}
                handleChange={handleModelChange}
              />
            )}
            {showBadgeDropdown && (
              <Dropdown
                placeholder={"Choose Badge"}
                value={selectedBadge}
                data={badges}
                handleChange={handleBadgeChange}
              />
            )}
          </div>

          {showFileUpload && (
            <div className="flex w-full h-full flex-col gap-2">
              <FileInput setFile={setLogbookFile} />
              <button
                type="submit"
                className="border p-1 w-full cursor-pointer bg-[#222] text-white font-medium rounded-lg"
              >
                Submit
              </button>
            </div>
          )}
          <PopularVehicles
            handleSelectedVehicle={handlePopularVehicleSelection}
          />
        </div>
      </form>
    </div>
  );
};
