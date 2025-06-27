'use client';

import { useState } from 'react';
import Image from 'next/image';
import DogPic from '@/assets/dog-photo.png';
import { useAuth } from '@/lib/authProvider';

import OnboardingFlow from './OnboardingFlow';
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
      <div className="relative h-72 sm:h-80 md:h-96 lg:h-130">
        <Image
          src={DogPic}
          alt="Happy dog representing pet adoption"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex-1 flex">
        <OnboardingFlow userId={user.id} onComplete={() => setFlowDone(true)} />
      </div>
    </div>
  );
}
