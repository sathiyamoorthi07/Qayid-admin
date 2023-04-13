import { useUI } from "@/context/uiContext";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {};
const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SideNavbar = (props: Props) => {
  const router = useRouter();
  const { displaySidebarMobile, closeSidebarMobile } = useUI();

  return (
    <>
      <aside
        className={classNames(
          "fixed top-20 left-0 bottom-0 w-64 bg-white overflow-y-auto bg-scroll overflow-x-hidden transition ease-in-out duration-300 z-10",
          { hidden: !displaySidebarMobile }
        )}
      >
        <nav
          className={classNames(
            " bg-white w-64 pl-4 pt-4 pb-6 flex flex-col min-h-full shadow"
          )}
        >
          <ul className="flex-grow">
            {links.map((link: any, index: number) => {
              return (
                <li className={`mb-2`} key={index}>
                  <Link href={link.href}>
                    <div
                      className={`block text-black py-4 pr-4 pl-10 rounded-l-full transition duration-200 hover:bg-gray-50  ${
                        router.pathname === link.href &&
                        "bg-blue-50 rounded-l-full text-sm font-normal text-blue-300 border-r-[4px] border-blue-400"
                      }`}
                    >
                      {link.label}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <div
        onClick={() => {
          closeSidebarMobile();
        }}
        className={classNames(
          `w-full h-screen overflow-hidden bg-gray-200 opacity-60 inset-0 fixed lg:hidden cursor-pointer`,
          { hidden: !displaySidebarMobile }
        )}
      ></div>
    </>
  );
};

export default SideNavbar;
