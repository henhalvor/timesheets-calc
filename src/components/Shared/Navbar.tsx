"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  function handleOpenMenuClick() {
    document.addEventListener("click", handleClickOutside);
  }

  function handleClickOutside(event: MouseEvent) {
    setIsCollapsed(true);
    document.removeEventListener("click", handleClickOutside);
  }

  return (
    <nav className="flex justify-between bg-background border-b-border border-b-[1px]">
      <h1 className="font-bold text-2xl p-4">
        <Link href={"/"}>TimeSheetsCalc</Link>
      </h1>
      <div className="relative h-full flex items-center mr-5">
        <ul className="hidden md:flex items-center gap-6">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/timesheets">Timesheets</Link>
          </li>
          <li>
            <Link href="/timesheets/upload">Upload</Link>
          </li>
        </ul>
        {isCollapsed ? (
          <IoMenu
            size={40}
            onClick={() => {
              toggleCollapse();
              handleOpenMenuClick();
            }}
            className="md:hidden opacity-70 hover:cursor-pointer hover:opacity-100 hover:scale-110"
          />
        ) : (
          <IoClose
            size={40}
            onClick={toggleCollapse}
            className="md:hidden opacity-70 hover:cursor-pointer hover:opacity-100 hover:scale-110"
          />
        )}
        {isCollapsed ? null : (
          <div className="md:hidden absolute top-full right-0 mt-1 flex flex-col justify-center w-[8rem] p-4 bg-background border-solid border-border border-[1px] rounded-md z-50">
            <ul className="flex flex-col gap-2">
              <li className="hover:scale-105 font-semibold">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:scale-105 font-semibold">
                <Link href="/timesheets">Timesheets</Link>
              </li>
              <li className="hover:scale-105 font-semibold">
                <Link href="/timesheets/upload">Upload</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
