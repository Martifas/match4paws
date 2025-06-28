/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@/components/ui/forms/FormSelect', () => ({
  FormSelect: ({ label, value }: any) => (
    <select aria-label={label} value={value} />
  ),
}));
vi.mock('@/components/ui/forms/ImageUrlManager', () => ({
  ImageUrlManager: () => <div data-testid="images" />,
}));


let formData: any;
const updateField = vi.fn();
const submitForm = vi.fn();
const resetForm = vi.fn();

vi.mock('@/hooks/usePetForm', () => ({
  usePetForm: () => ({
    formData,
    isSubmitting: false,
    isFormValid: true,
    updateField,
    submitForm,
    resetForm,
  }),
}));

const importModal = () => import('@/components/pet/petModal/AddPetModal');

describe('<AddPetModal />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders add-mode UI', async () => {
    formData = {
      name: '',
      type: 'dog',
      breed: '',
      gender: 'female',
      size: 'medium',
      ageGroup: 'adult',
      description: '',
      imageUrls: [],
    };

    const { default: AddPetModal } = await importModal();
    render(
      <AddPetModal open onClose={vi.fn()} onSubmit={vi.fn()} pet={null} />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Add New Pet')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add pet/i })
    ).toBeInTheDocument();
  });

  it('patches existing pet data in edit-mode', async () => {
    const pet = {
      id: 'p1',
      name: 'Luna',
      type: 'cat',
      breed: 'Siamese',
      gender: 'female',
      size: 'small',
      ageGroup: 'senior',
      description: 'old cat',
      imageUrls: ['a.jpg'],
    };
    formData = { ...pet };

    const { default: AddPetModal } = await importModal();
    render(<AddPetModal open onClose={vi.fn()} onSubmit={vi.fn()} pet={pet} />);

    expect(updateField).toHaveBeenCalledWith('name', 'Luna');
    expect(updateField).toHaveBeenCalledWith('type', 'cat');
    expect(updateField).toHaveBeenCalledWith('breed', 'Siamese');
    expect(updateField).toHaveBeenCalledWith('gender', 'female');
    expect(updateField).toHaveBeenCalledWith('size', 'small');
    expect(updateField).toHaveBeenCalledWith('ageGroup', 'senior');
    expect(updateField).toHaveBeenCalledWith('description', 'old cat');
    expect(updateField).toHaveBeenCalledWith('imageUrls', ['a.jpg']);
    expect(screen.getByText('Edit Pet')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /save changes/i })
    ).toBeInTheDocument();
  });

  it('submits via submitForm and passes pet id', async () => {
    formData = { name: 'Rex', type: 'dog' };
    submitForm.mockImplementation(async (cb, close) => {
      await cb(formData);
      close();
    });

    const onSubmit = vi.fn();
    const onClose = vi.fn();
    const { default: AddPetModal } = await importModal();
    render(
      <AddPetModal open onClose={onClose} onSubmit={onSubmit} pet={null} />
    );

    await userEvent.click(screen.getByRole('button', { name: /add pet/i }));

    expect(submitForm).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(formData, undefined);
    expect(onClose).toHaveBeenCalled();
  });
});
