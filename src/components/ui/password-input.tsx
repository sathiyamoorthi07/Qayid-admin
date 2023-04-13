import classNames from "classnames";
import React, { useState } from "react";

type Props = {
  name: string;
  lablebg?: string;
  label: string;
  className?: string;
};

const PassswordInput = ({
  lablebg = "bg-white",
  label,
  name,
  className,
}: Props) => {
  const [show, setShow] = useState(false);
  return (
    <div className={`relative ${className}`}>
      <input
        name={name}
        type={show ? "text" : "password"}
        id={name}
        className={`block pl-2.5 pr-7 py-2.5 text-sm w-full h-full text-gray-600 bg-transparent rounded-md border-1 border-neutral-60 appearance-non focus:outline-none focus:ring-0 focus:border-blue-500 peer border`}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute text-sm text-gray-300 duration-300 transform -translate-y-[18px] scale-75 top-2 origin-[0] ${lablebg} px-2 peer-focus:px-2 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[18px] left-2`}
      >
        {label}
      </label>
      <label
        htmlFor={name}
        className={classNames(
          "absolute right-0 text-neutral-60 cursor-pointer start-90p -translate-y-1/2 top-1/2 p-2"
        )}
        onClick={() => setShow((prev) => !prev)}
      >
        {/* {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />} */}
      </label>
    </div>
  );
};

export default PassswordInput;
