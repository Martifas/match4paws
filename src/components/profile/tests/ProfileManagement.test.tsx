/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileManagement from '../ProfileManagement';

global.fetch = vi.fn();

vi.mock('@/hooks/useUserProfile', () => ({
  default: vi.fn(() => ({
    user: { name: 'John Doe', phone: '+1234567890', address: '123 Main St' },
    isLoading: false,
  })),
}));

vi.mock('@/hooks/useProfileForm', () => ({
  default: vi.fn(() => ({
    fields: { name: 'John Doe', phone: '+1234567890', address: '123 Main St' },
    update: vi.fn(),
    dirty: false,
    resetDirty: vi.fn(),
  })),
}));

vi.mock('@mui/material', () => ({
  Box: ({ children, className, component }: any) =>
    component === 'form' ? (
      <form className={className}>{children}</form>
    ) : (
      <div className={className}>{children}</div>
    ),
  TextField: ({
    label,
    value,
    onChange,
    required,
    multiline,
    rows,
    placeholder,
  }: any) => (
    <input
      data-testid={`textfield-${label.toLowerCase().replace(' ', '-')}`}
      placeholder={placeholder || label}
      value={value}
      onChange={onChange}
      required={required}
      data-multiline={multiline}
      data-rows={rows}
    />
  ),
  CircularProgress: () => <div data-testid="loading">Loading...</div>,
  Snackbar: ({ open, children, onClose, autoHideDuration }: any) =>
    open ? (
      <div
        data-testid="snackbar"
        data-duration={autoHideDuration}
        onClick={onClose}
      >
        {children}
      </div>
    ) : null,
  Alert: ({ severity, children, sx }: any) => (
    <div data-testid={`alert-${severity}`} style={sx}>
      {children}
    </div>
  ),
}));

vi.mock('mui-tel-input', () => ({
  MuiTelInput: ({ label, value, onChange, defaultCountry, required }: any) => (
    <input
      data-testid="tel-input"
      placeholder={label}
      value={value}
      onChange={e => onChange(e.target.value)}
      data-country={defaultCountry}
      required={required}
    />
  ),
}));

vi.mock('@/components/ui/containers/Header', () => ({
  default: ({ left, center }: any) => (
    <div data-testid="header">
      <div>{left}</div>
      <div>{center}</div>
    </div>
  ),
}));

vi.mock('@/components/ui/buttons/BackButton', () => ({
  default: ({ smartNavigation }: any) => (
    <button data-testid="back-button" data-smart={smartNavigation}>
      Back
    </button>
  ),
}));

vi.mock('@/components/ui/buttons/PrimaryButton', () => ({
  default: ({ children, disabled, onClick }: any) => (
    <button data-testid="primary-button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
}));

import useUserProfile from '@/hooks/useUserProfile';
import useProfileForm from '@/hooks/useProfileForm';

const mockUseUserProfile = vi.mocked(useUserProfile);
const mockUseProfileForm = vi.mocked(useProfileForm);
const mockFetch = vi.mocked(fetch);

describe('ProfileManagement', () => {
  const mockUpdate = vi.fn();
  const mockResetDirty = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseProfileForm.mockReturnValue({
      fields: {
        name: 'John Doe',
        phone: '+1234567890',
        address: '123 Main St',
      },
      update: mockUpdate,
      dirty: false,
      resetDirty: mockResetDirty,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should show loading when user is loading', () => {
    mockUseUserProfile.mockReturnValue({
      user: null,
      isLoading: true,
    });

    render(<ProfileManagement />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should show loading when user is null', () => {
    mockUseUserProfile.mockReturnValue({
      user: null,
      isLoading: false,
    });

    render(<ProfileManagement />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should render profile form when user exists', () => {
    render(<ProfileManagement />);

    expect(screen.getByText('My Profile')).toBeInTheDocument();
    expect(screen.getByTestId('textfield-full-name')).toHaveValue('John Doe');
    expect(screen.getByTestId('tel-input')).toHaveValue('+1234567890');
    expect(screen.getByTestId('textfield-address')).toHaveValue('123 Main St');
  });

  it('should disable save button when not dirty', () => {
    render(<ProfileManagement />);

    const saveButton = screen.getByTestId('primary-button');
    expect(saveButton).toBeDisabled();
  });

  it('should enable save button when dirty and required fields filled', () => {
    mockUseProfileForm.mockReturnValue({
      fields: {
        name: 'John Doe',
        phone: '+1234567890',
        address: '123 Main St',
      },
      update: mockUpdate,
      dirty: true,
      resetDirty: mockResetDirty,
    });

    render(<ProfileManagement />);

    const saveButton = screen.getByTestId('primary-button');
    expect(saveButton).not.toBeDisabled();
  });

  it('should disable save button when name is empty', () => {
    mockUseProfileForm.mockReturnValue({
      fields: { name: '', phone: '+1234567890', address: '123 Main St' },
      update: mockUpdate,
      dirty: true,
      resetDirty: mockResetDirty,
    });

    render(<ProfileManagement />);

    const saveButton = screen.getByTestId('primary-button');
    expect(saveButton).toBeDisabled();
  });

  it('should disable save button when phone is empty', () => {
    mockUseProfileForm.mockReturnValue({
      fields: { name: 'John Doe', phone: '', address: '123 Main St' },
      update: mockUpdate,
      dirty: true,
      resetDirty: mockResetDirty,
    });

    render(<ProfileManagement />);

    const saveButton = screen.getByTestId('primary-button');
    expect(saveButton).toBeDisabled();
  });

  it('should call update when name field changes', async () => {
    const user = userEvent.setup();
    render(<ProfileManagement />);

    const nameField = screen.getByTestId('textfield-full-name');
    await user.type(nameField, 'New Name');

    expect(mockUpdate).toHaveBeenCalledWith('name', expect.any(String));
  });

  it('should call update when phone field changes', async () => {
    const user = userEvent.setup();
    render(<ProfileManagement />);

    const phoneField = screen.getByTestId('tel-input');
    await user.type(phoneField, '123');

    expect(mockUpdate).toHaveBeenCalledWith('phone', expect.any(String));
  });

  it('should call update when address field changes', async () => {
    const user = userEvent.setup();
    render(<ProfileManagement />);

    const addressField = screen.getByTestId('textfield-address');
    await user.type(addressField, 'New Address');

    expect(mockUpdate).toHaveBeenCalledWith('address', expect.any(String));
  });

  it('should handle successful save', async () => {
    mockUseProfileForm.mockReturnValue({
      fields: {
        name: 'John Doe',
        phone: '+1234567890',
        address: '123 Main St',
      },
      update: mockUpdate,
      dirty: true,
      resetDirty: mockResetDirty,
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
    } as Response);

    const user = userEvent.setup();
    render(<ProfileManagement />);

    const saveButton = screen.getByTestId('primary-button');
    await user.click(saveButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          phone: '+1234567890',
          address: '123 Main St',
        }),
      });
    });

    expect(mockResetDirty).toHaveBeenCalled();
    expect(screen.getByTestId('alert-success')).toBeInTheDocument();
    expect(screen.getByText('Profile updated!')).toBeInTheDocument();
  });

  it('should handle save error', async () => {
    mockUseProfileForm.mockReturnValue({
      fields: {
        name: 'John Doe',
        phone: '+1234567890',
        address: '123 Main St',
      },
      update: mockUpdate,
      dirty: true,
      resetDirty: mockResetDirty,
    });

    mockFetch.mockResolvedValueOnce({
      ok: false,
    } as Response);

    const user = userEvent.setup();
    render(<ProfileManagement />);

    const saveButton = screen.getByTestId('primary-button');
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByTestId('alert-error')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    });
  });

  it('should handle fetch rejection', async () => {
    mockUseProfileForm.mockReturnValue({
      fields: {
        name: 'John Doe',
        phone: '+1234567890',
        address: '123 Main St',
      },
      update: mockUpdate,
      dirty: true,
      resetDirty: mockResetDirty,
    });

    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const user = userEvent.setup();
    render(<ProfileManagement />);

    const saveButton = screen.getByTestId('primary-button');
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByTestId('alert-error')).toBeInTheDocument();
    });
  });

  it('should show saving state during save', async () => {
    mockUseProfileForm.mockReturnValue({
      fields: {
        name: 'John Doe',
        phone: '+1234567890',
        address: '123 Main St',
      },
      update: mockUpdate,
      dirty: true,
      resetDirty: mockResetDirty,
    });

    mockFetch.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    const user = userEvent.setup();
    render(<ProfileManagement />);

    const saveButton = screen.getByTestId('primary-button');
    await user.click(saveButton);

    expect(screen.getByText('Saving…')).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
  });

  it('should not save when not dirty', async () => {
    mockUseProfileForm.mockReturnValue({
      fields: {
        name: 'John Doe',
        phone: '+1234567890',
        address: '123 Main St',
      },
      update: mockUpdate,
      dirty: false,
      resetDirty: mockResetDirty,
    });

    const user = userEvent.setup();
    render(<ProfileManagement />);

    const saveButton = screen.getByTestId('primary-button');
    await user.click(saveButton);

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should close snackbar when clicked', async () => {
    mockUseProfileForm.mockReturnValue({
      fields: {
        name: 'John Doe',
        phone: '+1234567890',
        address: '123 Main St',
      },
      update: mockUpdate,
      dirty: true,
      resetDirty: mockResetDirty,
    });

    mockFetch.mockResolvedValueOnce({ ok: true } as Response);

    const user = userEvent.setup();
    render(<ProfileManagement />);

    const saveButton = screen.getByTestId('primary-button');
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByTestId('snackbar')).toBeInTheDocument();
    });

    const snackbar = screen.getByTestId('snackbar');
    await user.click(snackbar);

    await waitFor(() => {
      expect(screen.queryByTestId('snackbar')).not.toBeInTheDocument();
    });
  });

  it('should configure tel input with LT country', () => {
    render(<ProfileManagement />);

    const telInput = screen.getByTestId('tel-input');
    expect(telInput).toHaveAttribute('data-country', 'LT');
  });

  it('should set address field as multiline', () => {
    render(<ProfileManagement />);

    const addressField = screen.getByTestId('textfield-address');
    expect(addressField).toHaveAttribute('data-multiline', 'true');
    expect(addressField).toHaveAttribute('data-rows', '2');
  });
});
