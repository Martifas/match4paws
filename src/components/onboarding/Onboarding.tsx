"use client";

import { useState } from "react";
import DogPic from "../../assets/dog-photo.png";
import Image from "next/image";
import OnboardingFlow from "./OnboardingFlow";
import OnboardingForm from "./OnboardingForm";
import { useAuth } from "@/lib/authProvider";

export default function Onboarding() {
  const user = useAuth();
  const [flowCompleted, setFlowCompleted] = useState(false);

  return flowCompleted ? (
    <OnboardingForm userId={user.id} />
  ) : (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex-1 relative">
        <Image
          src={DogPic}
          alt="Dog Pic"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex-1">
        <OnboardingFlow
          userId={user.id}
          onComplete={() => setFlowCompleted(true)}
        />
      </div>
    </div>
  );
}
