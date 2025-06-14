"use client";

import DogPic from "../../assets/dog-photo.png";
import Image from "next/image";
import SimpleContainer from "../ui/container/Container";
import OnboardingFlow from "./OnboardingFlow";

type Props = {
  userId: string;
};

function Onboarding({ userId} : Props) {
  return (
    <SimpleContainer>
      <div className="bg-white min-h-screen flex flex-col">
        <div className="flex-1 overflow-hidden">
          <Image src={DogPic} alt="Dog Pic" className="object-fill" priority />
        </div>

        <div className="flex-1 flex">
          <OnboardingFlow userId={userId} />
        </div>
      </div>
    </SimpleContainer>
  );
}

export default Onboarding;
