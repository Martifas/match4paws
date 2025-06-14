import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

export default async function Page() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div>
      <h1>Welcome to Match4Paws!</h1>
      <p>Hello, {session.user.name}!</p>
      <Link href="/onboarding">Get Started</Link>
    </div>
  );
}
