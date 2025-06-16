'use client';

import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProgressBar from '../ui/progressBar/ProgressBar';

type OnboardingFormData = {
  userType: 'petOwner' | 'adopter' | null;
  preferredAnimalTypes: string[];
  animalsToPlace?: string[];
  name?: string;
  email?: string;
  location?: string;
};

export default function OnboardingForm() {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 4;
  const [formData, setFormData] = useState<OnboardingFormData>({
    userType: null,
    preferredAnimalTypes: [],
  });
  const progressPercent = ((activeStep + 1) / totalSteps) * 100;

  const formContent = [
    {
      title: 'Tell us about yourself',
      description:
        'Are you a Pet Owner or Organization ready to find loving homes? Or a Pet Adopter looking for your new best friend?',
    },
    {
      title: "Let's Find Your Match",
      description:
        'What type of animal are you looking to adopt? Don’t worry—you can always change this later.',
    },
    {
      title: 'List Your Animal(s) for Adoption',
      description:
        'What type of animal(s) are you looking to place in a loving home? You can add more later.',
    },
    {
      title: 'Final Steps!',
      description:
        "We're almost there! Fill in your personal details to create a profile and start your journey toward a furry friendship.",
    },
  ];

  const handleNext = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(prev => prev - 1);
  };

  const handleFinish = () => {
    console.log('Submitting:', formData);
  };

  return (
    <div className="flex flex-col justify-between flex-1 px-4 py-8 h-full">
      <div className="relative flex items-center justify-center px-8 py-2 min-h-[48px]">
        {activeStep > 0 && (
          <button
            onClick={handleBack}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ed9426] font-bold z-10"
          >
            <ArrowBackIcon />
          </button>
        )}

        <ProgressBar value={progressPercent} />

        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium z-10">
          {activeStep + 1}/{totalSteps}
        </span>
      </div>

      <div className="text-center flex flex-1 flex-col gap-8 justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
          {formContent[activeStep].title}
        </h1>
        <p className="text-gray-600 text-xl leading-relaxed">
          {formContent[activeStep].description}
        </p>

        {activeStep === 0 && (
          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-4">
              {['adopter', 'petOwner'].map(type => (
                <button
                  key={type}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      userType: type as OnboardingFormData['userType'],
                    })
                  }
                  className={`px-4 py-2 rounded-full border capitalize ${
                    formData.userType === type
                      ? 'bg-[#ed9426] text-white'
                      : 'bg-white text-gray-700'
                  }`}
                >
                  {type === 'petOwner' ? 'Pet Owner' : type}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        className="bg-[#ed9426] text-white font-bold px-4 py-2 rounded-full mt-6"
      >
        {activeStep === totalSteps - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}
