import { ImageForm } from "@/components/ImageForm";
import UsersImages from "@/components/UsersImages";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <h1>Index</h1>
    </div>
  );
}
