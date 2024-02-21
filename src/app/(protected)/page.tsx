import { ImageForm } from "@/components/UI/ImageForm";
import UsersImages from "@/components/UsersImages";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center">
      <h1>Index</h1>
      <ImageForm />
    </main>
  );
}
