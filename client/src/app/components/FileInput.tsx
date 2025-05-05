import React, { SetStateAction } from "react";

export const FileInput = (props: {
  setFile: React.Dispatch<SetStateAction<File | null>>;
}) => {
  return (
    <>
      <label
        htmlFor="logbook"
        className="text-start w-full text-sm font-medium"
      >
        Upload Logbook
      </label>
      <input
        onChange={(e) => {
          if (!e.target.files) {
            props.setFile(null);
            return;
          }
          props.setFile(e.target.files[0]);
        }}
        type="file"
        accept=".txt"
        id="logbook"
        className="w-full border p-1"
      />
    </>
  );
};
