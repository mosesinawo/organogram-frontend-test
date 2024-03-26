import React, { ReactNode } from "react";

interface ButtonProps {
  name: string;
  onClick: () => void;
  icon: ReactNode;
}

function Button({ name, icon, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-bluePrimary text-lg bg-stone-200 flex items-center px-2 py-2 rounded-md w-fit`}
      type="button"
    >
      {icon}
      {name}
    </button>
  );
}

export default Button;
