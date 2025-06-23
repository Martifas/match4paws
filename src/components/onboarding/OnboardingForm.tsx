"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../ui/progressBar/ProgressBar";
import DogIcon from "@/assets/DogIcon";
import CatIcon from "@/assets/CatIcon";
import { MuiTelInput } from "mui-tel-input";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import BackButton from "../ui/buttons/BackButton";

type OnboardingFormData = {
  userType: "petOwner" | "adopter" | null;
  preferredAnimalTypes: string[];
  animalsToPlace?: string[];
  name?: string;
  email?: string;
  phone?: string;
  gender?: "male" | "female" | "other" | "non-binary" | "prefer-not-to-say";
  location?: string;
};

type Props = {
  userId: string;
};

export default function OnboardingForm({ userId }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  const totalSteps = 3;
  const [formData, setFormData] = useState<OnboardingFormData>({
    userType: null,
    preferredAnimalTypes: [],
  });
  const progressPercent = ((activeStep + 1) / totalSteps) * 100;

  const getFormContent = () => {
    return [
      {
        title: "Tell us about yourself",
        description:
          "Are you a Pet Owner or Organization ready to find loving homes? Or a Pet Adopter looking for your new best friend?",
      },
      formData.userType === "petOwner"
        ? {
            title: "List Your Animal(s) for Adoption",
            description:
              "What type of animal(s) are you looking to place in a loving home? You can add more later.",
          }
        : {
            title: "Let's Find Your Match",
            description:
              "What type of animal are you looking to adopt? Don’t worry—you can always change this later.",
          },
      {
        title: "Final Steps!",
        description:
          "We're almost there! Fill in your personal details to create a profile and start your journey toward a furry friendship.",
      },
    ];
  };

  const handleNext = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleFinish = async () => {
    try {
      const response = await fetch("/api/update-onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          ...formData,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        console.error("Failed to complete onboarding:", error);
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("Error submitting onboarding form:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between flex-1 px-4 py-8 h-full">
      <div className="relative flex items-center justify-center px-8 py-2 min-h-[48px]">
        <BackButton onClick={handleBack} hidden={activeStep === 0} />

        <ProgressBar value={progressPercent} />

        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium z-10">
          {activeStep + 1}/{totalSteps}
        </span>
      </div>

      <div className="text-center flex flex-1 flex-col gap-5 justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
          {getFormContent()[activeStep].title}
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          {getFormContent()[activeStep].description}
        </p>

        {activeStep === 0 && (
          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-4 flex-col w-full">
              {["Pet Adopter", "petOwner"].map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      userType: type as OnboardingFormData["userType"],
                    })
                  }
                  className={`flex items-center py-5 hover:border-orange-300 hover:scale-101 md:py-7 rounded-xl border-2 border-gray-200 w-full h-8 justify-center md:w-3/5 mx-auto ${
                    formData.userType === type
                      ? "border-orange-400"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {type === "petOwner" ? "Pet Owner or Organization" : type}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div className="flex flex-col gap-6 items-center">
            <div className="flex flex-row gap-6 justify-center">
              {[
                { label: "Cats", value: "cats", icon: <CatIcon /> },
                { label: "Dogs", value: "dogs", icon: <DogIcon /> },
              ].map(({ label, value, icon }) => {
                const isSelected =
                  formData.preferredAnimalTypes.includes(value);

                return (
                  <button
                    key={value}
                    onClick={() => {
                      const newSelection = isSelected
                        ? formData.preferredAnimalTypes.filter(
                            (type) => type !== value
                          )
                        : [...formData.preferredAnimalTypes, value];

                      setFormData({
                        ...formData,
                        preferredAnimalTypes: newSelection,
                      });
                    }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 w-36 h-40 justify-center hover:border-orange-300 hover:scale-105 transition-all ${
                      isSelected
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <div className="w-16 h-16">{icon}</div>
                    <span className="text-lg font-semibold text-gray-700">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-gray-500">
              You can select more than one.
            </p>
          </div>
        )}

        {activeStep === 2 && (
          <div className="flex flex-col gap-6 items-center w-full md:w-3/5 mx-auto">
            <TextField
              required
              fullWidth
              label="Full Name"
              color="warning"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <MuiTelInput
              required
              fullWidth
              label="Phone Number"
              defaultCountry="LT"
              value={formData.phone || ""}
              onChange={(newValue) =>
                setFormData({ ...formData, phone: newValue })
              }
            />

            <FormControl fullWidth required color="warning">
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                value={formData.gender || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value as OnboardingFormData["gender"],
                  })
                }
                sx={{ textAlign: "left" }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="non-binary">Non-binary</MenuItem>
                <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        className="bg-[#ed9426] hover:bg-orange-300 hover:scale-101 text-white max-w-md w-full md:w-3/5 mx-auto font-bold px-4 py-3 rounded-full mt-6"
      >
        {activeStep === totalSteps - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}
