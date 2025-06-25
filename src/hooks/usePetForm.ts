import { useState } from "react";

export type PetFormData = {
  name: string;
  type: string;
  breed: string;
  gender: string;
  size: string;
  ageGroup: string;
  description: string;
  imageUrls: string[];
};

const initialFormData: PetFormData = {
  name: "",
  type: "",
  breed: "",
  gender: "",
  size: "",
  ageGroup: "",
  description: "",
  imageUrls: [],
};

export function usePetForm() {
  const [formData, setFormData] = useState<PetFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof PetFormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const isFormValid =
    formData.name &&
    formData.type &&
    formData.gender &&
    formData.size &&
    formData.ageGroup;

  const submitForm = async (
    onSubmit: (data: PetFormData) => Promise<void>,
    onSuccess?: () => void
  ) => {
    if (!isFormValid) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      resetForm();
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting pet form:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    isFormValid,
    updateField,
    resetForm,
    submitForm,
  };
}
