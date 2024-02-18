"use client";

import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";

export default function Sidenav() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <IoMenu size={40} onClick={toggleCollapse} className="absolute top-17 left-2 opacity-70 hover:cursor-pointer hover:opacity-100" />
      {isCollapsed ? null : (
        <nav
          className={`w-52 flex flex-col p-4 pt-10 bg-gray-500 border-solid border-black border-[1px]`}
        >
          <ul>
            <li>
              <a href="#">Link 1</a>
            </li>
            <li>
              <a href="#">Link 2</a>
            </li>
            <li>
              <a href="#">Link 3</a>
            </li>
            <li>
              <a href="#">Link 4</a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
