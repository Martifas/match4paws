import { TextField } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { USER_TYPES } from '@/lib/constants/onboardingForm';
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
      <TextField
        required
        fullWidth
        label="Address"
        color="warning"
        value={formData.address || ''}
        onChange={e => setFormData({ ...formData, address: e.target.value })}
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
