import { FC } from "react";
import { OptionBoxProps } from "../utils";

export const OptionBox: FC<OptionBoxProps> = ({ label }) => {
  return (
    <div className="h-40 flex justify-center items-center bg-blue-700 rounded-md p-4">
      <h1 className="text-3xl font-bold text-white">{label}</h1>
    </div>
  );
};
