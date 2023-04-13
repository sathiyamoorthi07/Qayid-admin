import React, { ReactNode } from "react";
import AppHeader from "./header/app-header";
import SideNavbar from "./navbar/side-navbar";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <div className="flex-1 flex justify-between mt-20 sticky top-16">
        <SideNavbar />
        <main className="flex-1 lg:ml-64">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
