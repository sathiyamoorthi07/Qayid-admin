import React, { JSXElementConstructor, CSSProperties } from "react";
import cn from "classnames";
import { useRouter } from "next/router";

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode | any;
  html?: string;
  direction?: string;
}

// type Variant =
//   | "mediumHeading"
//   | "heading"
//   | "body"
//   | "subBody"
//   |"description"
//   | "pageHeading"
//   | "subHeading";
//   | "subTitle";
type Variant =
  | "heading"
  | "subHeading"
  | "title"
  | "subTitle"
  | "body"
  | "description";

const Text: React.FC<Props> = ({
  style,
  className,
  variant = "body",
  children,
  html,
}) => {
  const route = useRouter();

  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string;
  } = {
    heading: "h1",
    subHeading: "h3",
    title: "h4",
    subTitle: "p",
    body: "p",
    description: "p",
  };

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!];

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    <Component
      className={cn(
        {
          "text-gray-500 font-medium text-base leading-6":
            variant === "subTitle",
          "text-gray-500 font-normal text-base leading-6": variant === "body",
          "text-gray-300 font-normal text-sm leading-5":
            variant === "description",
          "text-black font-normal text-[28px] leading-9": variant === "heading",
          "text-gray-600 font-normal text-[22px] leading-9":
            variant === "subHeading",
          "text-gray-600 font-medium text-[20px] leading-9":
            variant === "title",
        },
        className
      )}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  );
};

export default Text;
