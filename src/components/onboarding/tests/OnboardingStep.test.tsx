/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserTypeStep, PersonalDetailsStep } from '../OnboardingSteps';

// Mock MuiTelInput
vi.mock('mui-tel-input', () => ({
  MuiTelInput: ({
    label,
    value,
    onChange,
    defaultCountry,
    required,
    fullWidth,
  }: any) => (
    <input
      data-testid="mui-tel-input"
      aria-label={label}
      value={value}
      onChange={e => onChange(e.target.value)}
      data-default-country={defaultCountry}
      data-required={required}
      data-full-width={fullWidth}
    />
  ),
}));

// Mock the constants
vi.mock('@/lib/constants/onboardingForm', () => ({
  USER_TYPES: [
    { id: 'petOwner', label: 'Pet Owner' },
    { id: 'adopter', label: 'Adopter' },
  ],
}));

describe('UserTypeStep', () => {
  const mockSetFormData = vi.fn();
  const defaultProps = {
    formData: {
      userType: null,
    },
    setFormData: mockSetFormData,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all user type options', () => {
    render(<UserTypeStep {...defaultProps} />);

    expect(screen.getByText('Pet Owner')).toBeInTheDocument();
    expect(screen.getByText('Adopter')).toBeInTheDocument();
  });

  it('highlights selected user type', () => {
    const props = {
      ...defaultProps,
      formData: { userType: 'petOwner' as const },
    };

    render(<UserTypeStep {...props} />);

    const petOwnerButton = screen.getByText('Pet Owner');
    expect(petOwnerButton).toHaveClass('border-orange-400', 'bg-orange-50');
  });

  it('applies default styling to unselected user types', () => {
    const props = {
      ...defaultProps,
      formData: { userType: 'petOwner' as const },
    };

    render(<UserTypeStep {...props} />);

    const adopterButton = screen.getByText('Adopter');
    expect(adopterButton).toHaveClass('bg-white', 'text-gray-700');
    expect(adopterButton).not.toHaveClass('border-orange-400', 'bg-orange-50');
  });

  it('calls setFormData when user type is selected', () => {
    render(<UserTypeStep {...defaultProps} />);

    const adopterButton = screen.getByText('Adopter');
    fireEvent.click(adopterButton);

    expect(mockSetFormData).toHaveBeenCalledWith({
      userType: 'adopter',
    });
  });

  it('updates selection when different user type is clicked', () => {
    const props = {
      ...defaultProps,
      formData: { userType: 'petOwner' as const, name: 'John Doe' },
    };

    render(<UserTypeStep {...props} />);

    const adopterButton = screen.getByText('Adopter');
    fireEvent.click(adopterButton);

    expect(mockSetFormData).toHaveBeenCalledWith({
      userType: 'adopter',
      name: 'John Doe',
    });
  });
});

describe('PersonalDetailsStep', () => {
  const mockSetFormData = vi.fn();
  const defaultProps = {
    formData: {
      userType: null,
    },
    setFormData: mockSetFormData,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<PersonalDetailsStep {...defaultProps} />);

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
  });

  it('displays current form data values', () => {
    const props = {
      ...defaultProps,
      formData: {
        name: 'John Doe',
        address: '123 Main St',
        phone: '+37060000000',
        userType: 'petOwner' as const,
      },
    };

    render(<PersonalDetailsStep {...props} />);

    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
    expect(screen.getByDisplayValue('+37060000000')).toBeInTheDocument();
  });

  it('handles empty form data gracefully', () => {
    render(<PersonalDetailsStep {...defaultProps} />);

    const nameField = screen.getByLabelText('Full Name');
    const addressField = screen.getByLabelText('Address');
    const phoneField = screen.getByLabelText('Phone Number');

    expect(nameField).toHaveValue('');
    expect(addressField).toHaveValue('');
    expect(phoneField).toHaveValue('');
  });

  it('updates form data when name field changes', () => {
    render(<PersonalDetailsStep {...defaultProps} />);

    const nameField = screen.getByLabelText('Full Name');
    fireEvent.change(nameField, { target: { value: 'Jane Smith' } });

    expect(mockSetFormData).toHaveBeenCalledWith({
      userType: null,
      name: 'Jane Smith',
    });
  });

  it('updates form data when address field changes', () => {
    const props = {
      ...defaultProps,
      formData: { userType: null, name: 'John Doe' },
    };

    render(<PersonalDetailsStep {...props} />);

    const addressField = screen.getByLabelText('Address');
    fireEvent.change(addressField, { target: { value: '456 Oak Ave' } });

    expect(mockSetFormData).toHaveBeenCalledWith({
      userType: null,
      name: 'John Doe',
      address: '456 Oak Ave',
    });
  });

  it('updates form data when phone field changes', () => {
    const props = {
      ...defaultProps,
      formData: { userType: null, name: 'John Doe', address: '123 Main St' },
    };

    render(<PersonalDetailsStep {...props} />);

    const phoneField = screen.getByLabelText('Phone Number');
    fireEvent.change(phoneField, { target: { value: '+37061234567' } });

    expect(mockSetFormData).toHaveBeenCalledWith({
      userType: null,
      name: 'John Doe',
      address: '123 Main St',
      phone: '+37061234567',
    });
  });

  it('configures phone input with correct props', () => {
    render(<PersonalDetailsStep {...defaultProps} />);

    const phoneField = screen.getByTestId('mui-tel-input');
    expect(phoneField).toHaveAttribute('data-default-country', 'LT');
    expect(phoneField).toHaveAttribute('data-required', 'true');
    expect(phoneField).toHaveAttribute('data-full-width', 'true');
  });

  it('preserves existing form data when updating individual fields', () => {
    const props = {
      ...defaultProps,
      formData: {
        userType: 'adopter' as const,
        name: 'John Doe',
        address: '123 Main St',
        phone: '+37060000000',
      },
    };

    render(<PersonalDetailsStep {...props} />);

    const nameField = screen.getByLabelText('Full Name');
    fireEvent.change(nameField, { target: { value: 'John Smith' } });

    expect(mockSetFormData).toHaveBeenCalledWith({
      userType: 'adopter',
      name: 'John Smith',
      address: '123 Main St',
      phone: '+37060000000',
    });
  });
});
