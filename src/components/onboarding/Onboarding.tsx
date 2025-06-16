'use client';

import { useState } from 'react';
import DogPic from '../../assets/dog-photo.png';
import Image from 'next/image';
import OnboardingFlow from './OnboardingFlow';
import OnboardingForm from './OnboardingForm';

type Props = {
  userId: string;
};

function Onboarding({ userId }: Props) {
  const [flowCompleted, setFlowCompleted] = useState(false);

  return flowCompleted ? (
    <OnboardingForm />
  ) : (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex-1 relative">
        <Image
          src={DogPic}
          alt="Dog Pic"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex-1 overflow-hidden">
        <OnboardingFlow
          userId={userId}
          onComplete={() => setFlowCompleted(true)}
        />
      </div>
    </div>
  );
}

export default Onboarding;
