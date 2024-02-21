import UsersImages from "@/components/UsersImages";
import { getAllUserImages } from "@/lib/userImages";
import React from "react";

export default async function Page() {
  const images = await getAllUserImages();
  return (
    <div>
      <UsersImages images={images}/>
    </div>
  );
}
