import { redirect } from "next/navigation";
import Box from "@mui/material/Box";
import Homepage from "@/components/homepage/Homepage";
import { getAuthenticatedUser, handleUserSession } from "@/lib/utils/authUtils";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

export default async function Page() {
  const user = await getAuthenticatedUser();

  if (user) {
    const onboardingCompleted = await handleUserSession(user.sub);

    if (!onboardingCompleted) {
      redirect("/onboarding");
    }
  }

  return (
    <Box sx={{ pb: 8 }}>
      <Homepage />
    </Box>
  );
}
