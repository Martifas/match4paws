'use client';

import { useState } from 'react';

type Props = {
  userId: string;
  onComplete: () => void;
};

export default function OnboardingFlow({ userId, onComplete }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 3;

  const stepContent = [
    {
      title: 'Match4Paws - Where Furry Tales Begin',
      description:
        'Embark on a heartwarming journey to find your perfect companion. Swipe, match, and open your heart to a new furry friend.',
    },
    {
      title: 'Explore a World of Companionship',
      description:
        'Discover a diverse array of adorable companions, find your favorites, and let the tail-wagging adventure begin.',
    },
    {
      title: 'Connect with Caring Pet Owners Around You',
      description:
        'Easily connect with pet owners, ask about animals, & make informed decisions. Match4Paws is here to guide you every step of the way.',
    },
  ];

  const finishOnboarding = async () => {
    try {
      const response = await fetch('/api/update-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        onComplete();
      }
    } catch (error) {
      console.error('Failed to update user metadata:', error);
    }
  };

  const handleNext = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleSkip = finishOnboarding;

  const handleContinue = () => {
    if (activeStep < totalSteps - 1) {
      handleNext();
    } else {
      finishOnboarding();
    }
  };

  return (
    <div className="flex flex-col justify-between flex-1 px-4 py-8 h-full">
      {/* Main Content Centered */}
      <div className="text-center flex flex-1 flex-col justify-center items-center gap-6 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
          {stepContent[activeStep].title}
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          {stepContent[activeStep].description}
        </p>

        {/* Dots */}
        <div className="flex justify-center gap-2 pt-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeStep ? 'bg-[#ed9426] w-8' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 items-center pt-6 w-full max-w-md mx-auto">
        {activeStep < totalSteps - 1 && (
          <button
            onClick={handleSkip}
            className="text-[#ed9426] font-bold py-3 px-6 w-full rounded-full bg-orange-50 hover:bg-orange-100 transition"
          >
            Skip
          </button>
        )}
        <button
          onClick={handleContinue}
          className="bg-[#ed9426] text-white font-bold py-3 px-6 w-full rounded-full hover:bg-[#d17d1f] transition"
        >
          {activeStep === totalSteps - 1 ? 'Get Started' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
