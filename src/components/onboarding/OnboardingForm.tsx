'use client';

import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/buttons/BackButton';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';
import ProgressBar from '@/components/ui/progressBar/ProgressBar';
import { UserTypeStep, PersonalDetailsStep } from './OnboardingSteps';
import { submitOnboarding } from '@/lib/utils/onboardingUtils';
import { OnboardingFormData } from '@/lib/types/onboarding';

const DoneStep = () => <Fragment />;
const alwaysTrue = () => true;

const STEPS = [
  {
    title: 'Tell us who you are',
    description: 'Select the role that best describes you.',
    render: UserTypeStep,
    validate: (data: OnboardingFormData) => !!data.userType,
  },
  {
    title: 'Your contact details',
    description: 'So shelters and adopters can reach you.',
    render: PersonalDetailsStep,
    validate: (data: OnboardingFormData) =>
      Boolean(data.name?.trim()) && Boolean(data.phone?.trim()),
  },
  {
    title: 'You are done!',
    description:
      'Awesome—you’re all set! Jump in to browse pets, manage your listings, and connect with our community of animal lovers.',
    render: DoneStep,
    validate: alwaysTrue,
  },
];

type Props = { userId: string };

export default function OnboardingForm({ userId }: Props) {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState<OnboardingFormData>({
    userType: null,
  });

  const isLast = step === STEPS.length - 1;
  const StepComponent = STEPS[step].render;
  const valid = STEPS[step].validate(form);
  const progress = ((step + 1) / STEPS.length) * 100;

  const next = async () => {
    if (!valid) return;
    if (isLast) {
      setBusy(true);
      await submitOnboarding(userId, form);
      router.push('/');
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <div className="flex flex-col justify-between flex-1 px-4 py-8">
      <div className="relative flex items-center justify-center px-8 py-2 min-h-[48px]">
        <BackButton hidden={step === 0} onClick={() => setStep(s => s - 1)} />
        <ProgressBar value={progress} />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
          {step + 1}/{STEPS.length}
        </span>
      </div>

      <div className="text-center flex flex-1 flex-col gap-5 justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
          {STEPS[step].title}
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          {STEPS[step].description}
        </p>

        <StepComponent formData={form} setFormData={setForm} />
      </div>

      <PrimaryButton onClick={next} disabled={!valid || busy}>
        {busy ? 'Submitting…' : isLast ? 'Finish' : 'Next'}
      </PrimaryButton>
    </div>
  );
}
