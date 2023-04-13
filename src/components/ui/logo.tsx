import Image from "next/image";
import Link from "next/link";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  return (
    <Link href={"/"} {...props} className="flex items-center gap-4">
      <Image
        src={"/assets/images/logo.png"}
        alt={"Logo"}
        height={50}
        width={50}
        loading="eager"
      />
      <Image
        src={"/assets/images/logo-name.png"}
        alt={"Logo"}
        height={110}
        width={150}
      
        loading="eager"
      />
    </Link>
  );
};

export default Logo;
