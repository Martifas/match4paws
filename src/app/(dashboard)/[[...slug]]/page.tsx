import { auth0 } from "@/lib/auth0";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import Box from "@mui/material/Box";
import Homepage from "@/components/homepage/Homepage";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

export default async function Page() {
  const session = await auth0.getSession();

  if (session) {
    const auth0Id = session.user.sub;

    await db
      .insertInto("users")
      .values({ auth0Id })
      .onConflict((oc) => oc.column("auth0Id").doNothing())
      .execute();

    await db
      .updateTable("users")
      .set({ lastLoginAt: new Date() })
      .where("auth0Id", "=", auth0Id)
      .execute();

    const { onboardingCompleted } =
      (await db
        .selectFrom("users")
        .select(["onboardingCompleted"])
        .where("auth0Id", "=", auth0Id)
        .executeTakeFirst()) ?? {};

    if (!onboardingCompleted) redirect("/onboarding");
  }

  return (
    <Box sx={{ pb: 8 }}>
      <Homepage />
    </Box>
  );
}
