"use client";

import { useState } from "react";
import Loading from "./Loading";
import DogPic from "../assets/dog-photo.png";
import Image from "next/image";
import "./Onboarding.scss";
import ProgressBar from "./ProgressBar";

function Onboarding() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col items-center h-screen bg-white">
      <div className="curved-section">
        <Image src={DogPic} alt="Dog Pic" />
      </div>
      <div className="flex flex-col bg-white text-wrap text-center">
        <h2 className="bg-white font-bold text-3xl">
          Match4Paws - Where Furry Tales Begin
        </h2>
        <p>
          Embark on a heartwarming journey to find your perfect companion.
          Swipe, match, and open your heart to a new furry friend.
        </p>
        <div>
          <ProgressBar />
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
