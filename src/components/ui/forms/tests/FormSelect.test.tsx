import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { FormSelect } from '../FormSelect';

vi.mock('@mui/material', () => {
  return {
    FormControl: ({
      children,
      fullWidth,
      required,
    }: {
      children: React.ReactNode;
      fullWidth?: boolean;
      required?: boolean;
    }) => (
      <div
        data-testid="form-control"
        data-fullwidth={fullWidth ? 'true' : 'false'}
        data-required={required ? 'true' : 'false'}
      >
        {children}
      </div>
    ),
    InputLabel: ({ children }: { children: React.ReactNode }) => (
      <label data-testid="input-label">{children}</label>
    ),
    Select: ({
      children,
      value,
      onChange,
      label,
    }: {
      children: React.ReactNode;
      value: string;
      label: string;
      onChange: React.ChangeEventHandler<HTMLSelectElement>;
    }) => (
      <>
        <select
          aria-label={label}
          data-testid="select"
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
      </>
    ),
    MenuItem: ({
      value,
      children,
    }: {
      value: string;
      children: React.ReactNode;
    }) => (
      <option data-testid="menu-item" value={value}>
        {children}
      </option>
    ),
  };
});

describe('<FormSelect />', () => {
  const OPTIONS = [
    { id: 'cat', label: 'Cat' },
    { id: 'dog', label: 'Dog' },
  ] as const;

  it('renders label and all options', () => {
    render(
      <FormSelect label="Pet" value="" onChange={() => {}} options={OPTIONS} />
    );

    expect(screen.getByTestId('input-label')).toHaveTextContent('Pet');
    expect(screen.getAllByTestId('menu-item')).toHaveLength(OPTIONS.length);
    OPTIONS.forEach(o =>
      expect(screen.getByRole('option', { name: o.label })).toBeInTheDocument()
    );
  });

  it('fires onChange with selected value', async () => {
    const handler = vi.fn();
    const user = userEvent.setup();

    render(
      <FormSelect label="Pet" value="" onChange={handler} options={OPTIONS} />
    );

    await user.selectOptions(screen.getByTestId('select'), 'dog');
    expect(handler).toHaveBeenCalledWith('dog');
  });

  it('passes required and fullWidth flags to FormControl', () => {
    render(
      <FormSelect
        label="Pet"
        value=""
        onChange={() => {}}
        options={OPTIONS}
        required
        fullWidth={false}
      />
    );

    const control = screen.getByTestId('form-control');
    expect(control).toHaveAttribute('data-required', 'true');
    expect(control).toHaveAttribute('data-fullwidth', 'false');
  });
});
