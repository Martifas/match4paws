import { useState } from "react";

export default function OnboardingFlow() {
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

  const handleNext = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleSkip = () => {
    console.log("Skipping onboarding...");
  };

  const handleContinue = () => {
    if (activeStep < totalSteps - 1) {
      handleNext();
    } else {
      console.log("Onboarding completed!");
    }
  };

  return (
    <div className="flex flex-col justify-between max-w-md mx-auto p-4 bg-white">
      <div className="flex flex-col justify-center text-center px-2 pb-8 min-h-[180px] ">
        <h1 className="text-xl font-bold text-gray-800 mb-4 leading-tight">
          {stepContent[activeStep].title}
        </h1>
        <p className="text-gray-600 text-base leading-relaxed">
          {stepContent[activeStep].description}
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4 pb-1">
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeStep ? "bg-[#ed9426] w-8" : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>

        <div className="w-full h-0.5 bg-[#ed9426]" />

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handleSkip}
            className="text-[#ed9426] font-medium py-2 px-5 rounded-full hover:bg-orange-50 transition-colors"
          >
            Skip
          </button>

          <button
            onClick={handleContinue}
            className="bg-[#ed9426] text-white font-medium py-2 px-6 rounded-full hover:bg-[#d17d1f] transition-colors"
          >
            {activeStep === totalSteps - 1 ? "Get Started" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
