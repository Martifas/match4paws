'use client';

import { useState } from 'react';
import Loading from './Loading';
import DogPic from '../../assets/dog-photo.png';
import Image from 'next/image';
import SimpleContainer from '../ui/Container';
import OnboardingFlow from './OnboardingFlow';

function Onboarding() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <SimpleContainer>
        <Loading />
      </SimpleContainer>
    );
  }

  return (
    <SimpleContainer>
      <div className="bg-white min-h-screen flex flex-col">
        <div className="flex-1 overflow-hidden">
          <Image src={DogPic} alt="Dog Pic" className="object-fill" priority />
        </div>

        <div className="flex-1 flex">
          <OnboardingFlow />
        </div>
      </div>
    </SimpleContainer>
  );
}

export default Onboarding;
