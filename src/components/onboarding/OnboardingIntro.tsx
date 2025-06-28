'use client';

import { useState } from 'react';
import Image from 'next/image';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';
import StepIndicator from '@/components/ui/stepIndicator/StepIndicator';
import { completeOnboardingIntro } from '@/lib/utils/onboardingIntroUtils';
import { ONBOARDING_FLOW_STEPS } from '@/lib/constants/onboardingIntro';

import Step1Image from '@/assets/images/petsearch.png';
import Step2Image from '@/assets/images/petinfo.png';
import Step3Image from '@/assets/images/messages.png';

const STEP_IMAGES = [Step1Image, Step2Image, Step3Image];

type Props = { userId: string; onComplete: () => void };

export default function OnboardingIntro({ userId, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const isLast = step === ONBOARDING_FLOW_STEPS.length - 1;

  const finish = async () => {
    setLoading(true);
    await completeOnboardingIntro(userId);
    setLoading(false);
    onComplete();
  };

  return (
    <>
      <div className="relative h-72 sm:h-80 md:h-96 lg:h-130">
        <Image
          src={STEP_IMAGES[step]}
          alt={`Onboarding step ${step + 1} illustration`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col justify-between flex-1 px-4 py-8">
        <div className="text-center flex flex-1 flex-col justify-center items-center gap-6 max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">
            {ONBOARDING_FLOW_STEPS[step].title}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            {ONBOARDING_FLOW_STEPS[step].description}
          </p>
        </div>

        <StepIndicator
          totalSteps={ONBOARDING_FLOW_STEPS.length}
          activeStep={step}
          className="pt-4"
        />

        <div className="flex flex-col md:flex-row gap-4 items-center pt-6 w-full max-w-md mx-auto">
          {!isLast && (
            <button
              onClick={finish}
              disabled={loading}
              className="text-[#ed9426] font-bold py-3 px-6 w-full rounded-full bg-orange-100 hover:bg-orange-200 transition disabled:opacity-50"
            >
              Skip
            </button>
          )}

          <PrimaryButton
            onClick={() => (isLast ? finish() : setStep(s => s + 1))}
            disabled={loading}
          >
            {loading ? 'Loading…' : isLast ? 'Get Started' : 'Continue'}
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}
