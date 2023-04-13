import cn from "classnames";
import React, { forwardRef, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "slim" | "smoke" | "outline";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
  disabled?: boolean;
  onClick?: any;
  direction?: string;
  rounded?: boolean;
  icon?: any;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = "flat",
    children,
    active,
    loading = false,
    disabled = false,
    onClick,
    direction = "right",
    rounded = false,
    icon,
    ...rest
  } = props;

  const rootClassName = cn(
    `text-[12px] md:text-2xs font-medium flex items-center cursor-pointer transition ease-in-out duration-300  justify-center focus-visible:outline-none focus:outline-none gap-2`,
    {
      "h-8 md:h-10 px-7 py-2 bg-blue-500 text-white  transform normal-case hover:bg-blue-600 border-0 border-transparent":
        variant === "slim",
      "h-6 md:h-10 px-7 py-2 text-gray-500 transform normal-case hover:text-gray-500 border-[1px] border-gray-300":
        variant === "outline",
      "h-8 md:h-10 px-7 bg-neutral-30 text-gray-500 py-2 transform-none normal-case border-0 border-transparent":
        variant === "smoke",
      "rounded-full": rounded,
      "rounded-md": rounded == false,
      "flex-row-reverse": direction == "left",
      "cursor-not-allowed": loading,
      "cursor-not-allowed hover:cursor-not-allowed": disabled,
    },
    className
  );

  return (
    <button
      aria-pressed={active}
      data-variant={variant}
      ref={ref}
      className={rootClassName}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
      {icon}
    </button>
  );
});

export default Button;
