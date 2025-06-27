import { useCallback, useState } from 'react';

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
  name: '',
  type: '',
  breed: '',
  gender: '',
  size: '',
  ageGroup: '',
  description: '',
  imageUrls: [],
};

export function usePetForm() {
  const [formData, setFormData] = useState<PetFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback(
    <K extends keyof PetFormData>(key: K, val: PetFormData[K]) =>
      setFormData(d => ({ ...d, [key]: val })),
    []
  );

  const resetForm = useCallback((next?: Partial<PetFormData>) => {
    setFormData(next ? { ...initialFormData, ...next } : initialFormData);
  }, []);

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
      console.error('Error submitting pet form:', error);
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
