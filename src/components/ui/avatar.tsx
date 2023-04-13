import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
};

const Avatar = ({ src, alt = "Logo", width, height, className }: Props) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-full ${className}`}
    />
  );
};

export default Avatar;
