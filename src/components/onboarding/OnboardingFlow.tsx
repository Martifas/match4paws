'use client';

import { useState } from 'react';
import PrimaryButton from '../ui/buttons/PrimaryButton';
import StepIndicator from '../ui/stepIndicator/StepIndicator';
import { ONBOARDING_FLOW_STEPS } from '@/lib/constants/onboardingFlow';
import { completeOnboardingFlow } from '@/lib/utils/onboardingFlowUtils';

type Props = {
  userId: string;
  onComplete: () => void;
};

export default function OnboardingFlow({ userId, onComplete }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = ONBOARDING_FLOW_STEPS.length;
  const isLastStep = activeStep === totalSteps - 1;
  const currentStep = ONBOARDING_FLOW_STEPS[activeStep];

  const finishOnboarding = async () => {
    setIsLoading(true);
    try {
      await completeOnboardingFlow(userId);
      onComplete();
    } catch (error) {
      console.error('Failed to complete onboarding flow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    if (isLastStep) {
      await finishOnboarding();
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col justify-between flex-1 px-4 py-8 h-full">
      <div className="text-center flex flex-1 flex-col justify-center items-center gap-6 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
          {currentStep.title}
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          {currentStep.description}
        </p>
      </div>

      <StepIndicator
        totalSteps={totalSteps}
        activeStep={activeStep}
        className="pt-4"
      />

      <div className="flex flex-col md:flex-row gap-4 items-center pt-6 w-full max-w-md mx-auto">
        {!isLastStep && (
          <button
            onClick={finishOnboarding}
            disabled={isLoading}
            className="text-[#ed9426] font-bold py-3 px-6 w-full rounded-full bg-orange-100 hover:bg-orange-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Skip
          </button>
        )}

        <PrimaryButton onClick={handleContinue} disabled={isLoading}>
          {isLoading ? 'Loading...' : isLastStep ? 'Get Started' : 'Continue'}
        </PrimaryButton>
      </div>
    </div>
  );
}
