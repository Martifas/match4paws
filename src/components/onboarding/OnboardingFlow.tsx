"use client";

import { useState } from "react";
import PrimaryButton from "../ui/buttons/PrimaryButton";

type Props = {
  userId: string;
  onComplete: () => void;
};

export default function OnboardingFlow({ userId, onComplete }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 3;

  const stepContent = [
    {
      title: "Match4Paws - Where Furry Tales Begin",
      description:
        "Embark on a heartwarming journey to find your perfect companion. Swipe, match, and open your heart to a new furry friend.",
    },
    {
      title: "Explore a World of Companionship",
      description:
        "Discover a diverse array of adorable companions, find your favorites, and let the tail-wagging adventure begin.",
    },
    {
      title: "Connect with Caring Pet Owners Around You",
      description:
        "Easily connect with pet owners, ask about animals, & make informed decisions. Match4Paws is here to guide you every step of the way.",
    },
  ];

  const finishOnboarding = async () => {
    try {
      const response = await fetch("/api/update-onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        onComplete();
      }
    } catch (error) {
      console.error("Failed to update user metadata:", error);
    }
  };

  const handleContinue = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      finishOnboarding();
    }
  };

  return (
    <div className="flex flex-col justify-between flex-1 px-4 py-8 h-full">
      <div className="text-center flex flex-1 flex-col justify-center items-center gap-6 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
          {stepContent[activeStep].title}
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          {stepContent[activeStep].description}
        </p>
      </div>
      <div className="flex justify-center gap-2 pt-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeStep
                ? "bg-[#ed9426] w-10 h-3"
                : "bg-gray-300 w-3 h-3"
            }`}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center pt-6 w-full max-w-md mx-auto">
        {activeStep < totalSteps - 1 && (
          <button
            onClick={finishOnboarding}
            className="text-[#ed9426] font-bold py-3 px-6 w-full rounded-full bg-orange-100 hover:bg-orange-200 transition"
          >
            Skip
          </button>
        )}

        <PrimaryButton onClick={handleContinue}>
          {activeStep === totalSteps - 1 ? "Get Started" : "Continue"}
        </PrimaryButton>
      </div>
    </div>
  );
}
