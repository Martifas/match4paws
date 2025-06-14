import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import Onboarding from "@/components/onboarding/Onboarding";

export default async function OnboardingPage() {
  const session = await auth0.getSession();
  console.log("SESSION:", session);

  if (!session) {
    console.log("No session found, redirecting...");
    redirect("/auth/login");
  }

  const userId = session.user.sub;
  console.log("Rendering Onboarding for userId:", userId);

  return <Onboarding userId={userId} />;
}
