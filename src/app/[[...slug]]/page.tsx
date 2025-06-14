import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

export default async function Page() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const userId = session.user.sub;

  // 1. Ensure user exists in DB
  await db
    .insertInto("users")
    .values({
      auth0Id: userId,
      onboardingCompleted: false,
      onboardingCompletedAt: null,
    })
    .onConflict((oc) => oc.column("auth0Id").doNothing()) // Don't error if user exists
    .execute();

  // 2. Fetch onboarding status
  const user = await db
    .selectFrom("users")
    .select(["onboardingCompleted"])
    .where("auth0Id", "=", userId)
    .executeTakeFirst();

  if (!user?.onboardingCompleted) {
    // 3. Redirect to onboarding page if needed
    redirect("/onboarding");
  }

  // ✅ Onboarding complete → render main page
  return (
    <div>
      <h1>Welcome to Match4Paws!</h1>
      <p>Hello, {session.user.name}!</p>
      <Link href="/onboarding">Get Started</Link>
    </div>
  );
}
