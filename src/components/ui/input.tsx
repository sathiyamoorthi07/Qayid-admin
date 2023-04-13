import classNames from "classnames";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {
  name: string;
  lablebg?: string;
  type?: string;
  label: string;
  className?: string;
};

const Input = ({
  lablebg = "bg-white",
  type = "text",
  label,
  name,
  className,
}: Props) => {
  return (
    <div className={`relative ${className}`}>
      <input
        name={name}
        type={type}
        id={name}
        className={`block pl-2.5 pr-7 py-2.5 text-sm w-full h-full text-gray-600 bg-transparent rounded-md border-1 border-neutral-60 appearance-none focus:outline-none focus:ring-0 focus:border-n focus:border-blue-500 peer border`}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute text-sm text-gray-300 duration-300 transform -translate-y-[18px] scale-75 top-2 origin-[0] ${lablebg} px-2 peer-focus:px-2 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[18px] left-2`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
