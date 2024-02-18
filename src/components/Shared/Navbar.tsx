"use client";

import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <nav className="flex justify-between bg-gray-500">
      <h1 className="font-bold text-2xl p-4">TimeSheetsCalc</h1>
      <div className="relative h-full flex items-center mr-5">
        <ul className="hidden md:flex items-center gap-6">
          <li>Nav item 1</li>
          <li>Nav item 2</li>
          <li>Nav item 3</li>
          <li>Nav item 4</li>
        </ul>
        <IoMenu
          size={40}
          onClick={toggleCollapse}
          className="md:hidden opacity-70 hover:cursor-pointer hover:opacity-100 hover:scale-110"
        />
        {isCollapsed ? null : (
          <div className="md:hidden absolute top-full right-0 flex flex-col justify-center w-[8rem] p-2 bg-gray-500 border-solid border-black border-[1px]">
            <ul>
              <li>Nav item 1</li>
              <li>Nav item 2</li>
              <li>Nav item 3</li>
              <li>Nav item 4</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
