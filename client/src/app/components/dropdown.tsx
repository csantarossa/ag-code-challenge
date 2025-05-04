"use client";
import React from "react";

export const Dropdown = <T extends string>(props: {
  value: T | "";
  placeholder: string;
  data: T[];
  handleChange: (value: T) => void;
}) => {
  return (
    <select
      value={props.value}
      className="capitalize w-full"
      onChange={(e) => {
        props.handleChange(e.target.value as T);
      }}
    >
      <option value="">{props.placeholder}</option>
      {props.data?.map((item: T, index: number) => (
        <option key={index} value={item} className="capitalize">
          {item}
        </option>
      ))}
    </select>
  );
};
