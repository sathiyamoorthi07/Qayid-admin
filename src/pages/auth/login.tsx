import { UserIcon } from "@/components/icons/user-icon";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PassswordInput from "@/components/ui/password-input";
import Text from "@/components/ui/text";
import Image from "next/image";
import React from "react";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className="w-screen h-screen flex items-start ">
      <div className="hidden w-[55%] h-full sm:flex items-center justify-center bg-gradient-to-t from-gradient-start to-gradient-end p-28">
        <Image
          src={"/assets/images/login-img.png"}
          width={400}
          height={400}
          alt="Log in"
        />
      </div>
      <div className="w-full  h-full sm:w-[45%] bg-white px-10 py-20 flex flex-col items-center justify-start relative">
        <Image
          src={"/assets/images/logo.png"}
          width={100}
          height={100}
          alt="Logo"
        />
        <Image
          src={"/assets/images/logo-name.png"}
          width={150}
          height={150}
          alt="community"
          className="mt-5 mb-10"
        />
        <div className=" w-full lg:w-2/3 xl:w-3/5 flex flex-col items-center justify-center ">
          <Text variant="title" className="my-3">
            Dashboard
          </Text>
          <Input
            label="Username or Email"
            name="username"
            className="my-3 w-full"
          />
          <PassswordInput
            label="password"
            name="password"
            className="my-3 w-full"
          />
          <Button variant="slim" className="w-full my-4">
            Sign In
          </Button>
          <Text variant="description" className="absolute bottom-7">
            All Right Reserved @Version 1.1
          </Text>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
