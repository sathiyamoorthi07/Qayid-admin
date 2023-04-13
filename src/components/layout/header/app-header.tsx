import { EyeIcon } from "@/components/icons/eye-icon";
import { EyeOff } from "@/components/icons/eye-off";
import MenuIcon from "@/components/icons/menu-icon";
import { UserIcon } from "@/components/icons/user-icon";
import Logo from "@/components/ui/logo";
import { useUI } from "@/context/uiContext";
import React from "react";

type Props = {};

const AppHeader = (props: Props) => {
  const { displaySidebarMobile, toggleSidebarMobile } = useUI();

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow py-2">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-10">
            <button
              className="block text-gray-600 cursor-pointer"
              onClick={() => {
                toggleSidebarMobile(!displaySidebarMobile);
              }}
            >
              <MenuIcon className="w-7 h-7" />
            </button>
            <Logo />
          </div>
          <div className="">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppHeader;
