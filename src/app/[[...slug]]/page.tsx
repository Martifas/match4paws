import Onboarding from "@/components/Onboarding";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

export default function Page() {
  return <Onboarding />;
}
