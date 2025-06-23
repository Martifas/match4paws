import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Box from "@mui/material/Box";
import Homepage from "@/components/homepage/Homepage";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

export default async function Page() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const userId = session.user.sub;

  await db
    .insertInto("users")
    .values({
      auth0Id: userId,
      onboardingCompleted: false,
      onboardingCompletedAt: null,
    })
    .onConflict((oc) => oc.column("auth0Id").doNothing())
    .execute();

  const user = await db
    .selectFrom("users")
    .select(["onboardingCompleted"])
    .where("auth0Id", "=", userId)
    .executeTakeFirst();

  if (!user?.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <>
      <Box sx={{ pb: 8 }}>
        <Homepage />
      </Box>
    </>
  );
}
