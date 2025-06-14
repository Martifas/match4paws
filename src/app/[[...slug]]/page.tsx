import Onboarding from "@/components/onboarding/Onboarding";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

export default function Page() {
  return <Onboarding />;
}
