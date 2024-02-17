import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

<LogoutLink>Log out</LogoutLink>;
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Index</h1>
      <LogoutLink>Log out</LogoutLink>
    </main>
  );
}
