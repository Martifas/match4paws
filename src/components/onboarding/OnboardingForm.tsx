'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '../ui/progressBar/ProgressBar';
import BackButton from '../ui/buttons/BackButton';
import PrimaryButton from '../ui/buttons/PrimaryButton';
import {
  UserTypeStep,
  AnimalTypeStep,
  PersonalDetailsStep,
} from './OnboardingSteps';
import { OnboardingFormData } from '@/lib/types/onboarding';
import {
  getStepContent,
  validateStep,
  submitOnboarding,
} from '@/lib/utils/onboardingUtils';

const TOTAL_STEPS = 3;

type Props = {
  userId: string;
};

export default function OnboardingForm({ userId }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<OnboardingFormData>({
    userType: null,
    preferredAnimalTypes: [],
  });

  const progressPercent = ((activeStep + 1) / TOTAL_STEPS) * 100;
  const stepContent = getStepContent(activeStep, formData.userType);
  const isStepValid = validateStep(activeStep, formData);
  const isLastStep = activeStep === TOTAL_STEPS - 1;

  const handleNext = async () => {
    if (!isStepValid) return;

    if (isLastStep) {
      await handleFinish();
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);

    try {
      await submitOnboarding(userId, formData);
      router.push('/');
    } catch (error) {
      console.error('Error submitting onboarding form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    const stepProps = { formData, setFormData };

    switch (activeStep) {
      case 0:
        return <UserTypeStep {...stepProps} />;
      case 1:
        return <AnimalTypeStep {...stepProps} />;
      case 2:
        return <PersonalDetailsStep {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-between flex-1 px-4 py-8 h-full">
      <div className="relative flex items-center justify-center px-8 py-2 min-h-[48px]">
        <BackButton onClick={handleBack} hidden={activeStep === 0} />
        <ProgressBar value={progressPercent} />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium z-10">
          {activeStep + 1}/{TOTAL_STEPS}
        </span>
      </div>

      <div className="text-center flex flex-1 flex-col gap-5 justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
          {stepContent.title}
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          {stepContent.description}
        </p>

        {renderStepContent()}
      </div>

      <PrimaryButton
        onClick={handleNext}
        disabled={!isStepValid || isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : isLastStep ? 'Finish' : 'Next'}
      </PrimaryButton>
    </div>
  );
}
