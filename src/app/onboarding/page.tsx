import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import Onboarding from "@/components/onboarding/Onboarding";

export default async function OnboardingPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const userId = session.user.sub;

  return <Onboarding userId={userId} />;
}
