import React from "react";

interface InputProps {
  textLabel: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputModal: React.FC<InputProps> = ({
  textLabel,
  placeholder,
  value,
  setValue,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className=" w-[100%] sm:w-[100%]  relative flex items-start flex-col">
      <label className="text-[14px] font-medium">{textLabel}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full py-3 px-4 outline-none border border-green rounded-lg text-sm"
      />
    </div>
  );
};

export default InputModal;
