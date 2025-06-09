"use client";

import { useState } from "react";
import Loading from "./Loading";
import DogPic from "../assets/dog-photo.png";
import Image from "next/image";
import "./Onboarding.scss";
import ProgressBar from "./ProgressBar";
import SimpleContainer from "./ui/Container";

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
        <div className="flex-shrink-0 max-h-[45vh] overflow-hidden">
          <Image
            src={DogPic}
            alt="Dog Pic"
            className="curved-section w-full h-full object-cover"
            priority
          />
        </div>
        <div className="flex-1 flex flex-col justify-center bg-white text-wrap text-center px-6 py-3">
          <div className="space-y-6">
            <h2 className="bg-white font-bold text-2xl md:text-3xl leading-tight">
              Match4Paws - Where Furry Tales Begin
            </h2>
            <p className="text-gray-700 text-base md:text-lg max-w-md mx-auto leading-relaxed">
              Embark on a heartwarming journey to find your perfect companion.
              Swipe, match, and open your heart to a new furry friend.
            </p>
            <div className="flex justify-center pt-1">
              <ProgressBar />
            </div>
          </div>
        </div>
      </div>
    </SimpleContainer>
  );
}

export default Onboarding;
