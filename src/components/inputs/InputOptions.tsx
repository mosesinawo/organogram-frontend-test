import React from "react";

interface InputProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

function InputOptions({ name, isSelected, onClick }: InputProps) {

  
  return (
    <div
      className={`bg-grayPrimary flex gap-2 items-center w-full sm:w-[500px] h-12 rounded-lg cursor-pointer px-2 mt-3 ${
        isSelected ? "bg-greenPrimary" : "bg-grayPrimary"
      }`}
      onClick={onClick}
    >
      <input
        type="radio"
        name={name}
        id={name}
        className="w-6 h-6"
        checked={isSelected}
      />
      <label className="text-lg text-bluePrimary" htmlFor={name}>
        {name}
      </label>
    </div>
  );
}

export default InputOptions;
