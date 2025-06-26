import { TextField } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { USER_TYPES, ANIMAL_TYPES } from '@/lib/constants/onboarding';
import { OnboardingStepProps } from '@/lib/types/onboarding';

export function UserTypeStep({ formData, setFormData }: OnboardingStepProps) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-4 flex-col w-full">
        {USER_TYPES.map(type => (
          <button
            key={type.id}
            onClick={() =>
              setFormData({
                ...formData,
                userType: type.id,
              })
            }
            className={`flex items-center py-5 hover:border-orange-300 hover:scale-101 md:py-7 rounded-xl border-2 border-gray-200 w-full h-8 justify-center md:w-3/5 mx-auto transition-all ${
              formData.userType === type.id
                ? 'border-orange-400 bg-orange-50'
                : 'bg-white text-gray-700'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AnimalTypeStep({ formData, setFormData }: OnboardingStepProps) {
  const toggleAnimalType = (value: string) => {
    const isSelected = formData.preferredAnimalTypes.includes(value);
    const newSelection = isSelected
      ? formData.preferredAnimalTypes.filter(type => type !== value)
      : [...formData.preferredAnimalTypes, value];

    setFormData({
      ...formData,
      preferredAnimalTypes: newSelection,
    });
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex flex-row gap-6 justify-center">
        {ANIMAL_TYPES.map(({ id, label, IconComponent }) => {
          const isSelected = formData.preferredAnimalTypes.includes(id);

          return (
            <button
              key={id}
              onClick={() => toggleAnimalType(id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 w-36 h-40 justify-center hover:border-orange-300 hover:scale-105 transition-all ${
                isSelected
                  ? 'border-orange-400 bg-orange-50'
                  : 'border-gray-300 bg-white'
              }`}
            >
              <div className="w-16 h-16">
                <IconComponent />
              </div>
              <span className="text-lg font-semibold text-gray-700">
                {label}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-sm text-gray-500">You can select more than one.</p>
    </div>
  );
}

export function PersonalDetailsStep({
  formData,
  setFormData,
}: OnboardingStepProps) {
  return (
    <div className="flex flex-col gap-6 items-center w-full md:w-3/5 mx-auto">
      <TextField
        required
        fullWidth
        label="Full Name"
        color="warning"
        value={formData.name || ''}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />

      <MuiTelInput
        required
        fullWidth
        label="Phone Number"
        defaultCountry="LT"
        value={formData.phone || ''}
        onChange={newValue => setFormData({ ...formData, phone: newValue })}
      />
    </div>
  );
}
