import { Eye } from "@/components/icons/eye-icon";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PassswordInput from "@/components/ui/password-input";
import Text from "@/components/ui/text";
import { GrLinkNext } from "react-icons/gr";
import { BsArrowRight, BsFillArrowThroughHeartFill } from "react-icons/bs";
import Avatar from "@/components/ui/avatar";

import React, { ReactNode } from "react";
import AppLayout from "@/components/layout/app-layout";

type Props = {};

const About = () => {
  return (
    <div className="relative w-full min-h-full flex items-center justify-center bg-gradient-to-t from-gradient-start to-gradient-end">
      <div className="w-[400px] h-auto p-10 bg-white shadow rounded-xl">
        <div className="flex items-center justify-center">
          <Avatar src="/assets/images/user.jpg" width={70} height={70} />
        </div>

        <Text variant="subHeading" className="text-center ">
          Samsudeen
        </Text>
        <Text variant="description" className="text-center ">
          +91 7010043514
        </Text>
        <Text variant="description" className="text-center ">
          Samsudeen@gmail.com
        </Text>

        <Text variant="title" className="text-center text-blue-500">
          Sign in
        </Text>
        <Input label="Username or Email" name="username" className="my-4" />
        <PassswordInput label="password" name="password" className="my-4" />

        <Text
          variant="description"
          className="text-end font-medium text-blue-500 cursor-pointer"
        >
          Forget password
        </Text>
        <Text
          variant="description"
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        >
          All Right Reserved @Version 1.1
        </Text>
        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" className="my-2 ">
            Import
          </Button>
          <Button variant="smoke" className="my-2">
            Madurai EC
          </Button>
        </div>
      </div>
    </div>
  );
};

About.getLayout = function (page: any) {
  return <AppLayout>{page}</AppLayout>;
};

export default About;
