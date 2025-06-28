'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/authProvider';

import OnboardingFlow from './OnboardingIntro';
import OnboardingForm from './OnboardingForm';

export default function Onboarding() {
  const user = useAuth();
  const [flowDone, setFlowDone] = useState(false);

  if (!user?.id)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading…</p>
      </div>
    );

  return flowDone ? (
    <OnboardingForm userId={user.id} />
  ) : (
    <div className="flex flex-col flex-1">
      <OnboardingFlow userId={user.id} onComplete={() => setFlowDone(true)} />
    </div>
  );
}
