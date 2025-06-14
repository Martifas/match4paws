import { useState } from 'react';

export default function OnboardingFlow() {
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

  const handleNext = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    console.log('Skipping onboarding...');
  };

  const handleContinue = () => {
    if (activeStep < totalSteps - 1) {
      handleNext();
    } else {
      console.log('Onboarding completed!');
    }
  };

  return (
    <div className="flex flex-col justify-between flex-1 px-4 py-16">
      <div className="text-center flex flex-1 min-h-[200px] flex-col gap-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
          {stepContent[activeStep].title}
        </h1>
        <p className="text-gray-600 text-xl leading-relaxed">
          {stepContent[activeStep].description}
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeStep ? 'bg-[#ed9426] w-8' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>

        <div className="w-full h-0.5 bg-[#ed9426]" />

        <div
          className={`flex gap-5 w-full ${
            activeStep === totalSteps - 1 ? 'justify-center' : 'justify-between'
          }`}
        >
          {activeStep < totalSteps - 1 && (
            <button
              onClick={handleSkip}
              className="flex-1 text-[#ed9426] font-bold py-3 px-6 rounded-full bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              Skip
            </button>
          )}
          <button
            onClick={handleContinue}
            className={`bg-[#ed9426] text-white font-bold py-3 px-6 rounded-full hover:bg-[#d17d1f] transition-colors ${
              activeStep === totalSteps - 1 ? 'w-full' : 'flex-1'
            }`}
          >
            {activeStep === totalSteps - 1 ? 'Get Started' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
