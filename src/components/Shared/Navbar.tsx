import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-gray-500">
      <h1 className="font-bold text-2xl">TimeSheetsCalc</h1>
      <ul className="flex flex-row items-center gap-6">
        <li>Nav item 1</li>
        <li>Nav item 2</li>
        <li>Nav item 3</li>
        <li>Nav item 4</li>
      </ul>
    </nav>
  );
}
