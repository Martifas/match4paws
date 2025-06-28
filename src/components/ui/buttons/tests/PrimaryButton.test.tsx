import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PrimaryButton from '../PrimaryButton';

describe('<PrimaryButton />', () => {
  it('renders a button element with its children', () => {
    render(<PrimaryButton>Save</PrimaryButton>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('includes width classes when fullWidth is true (the default)', () => {
    render(<PrimaryButton>Save</PrimaryButton>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('w-full');
    expect(btn).toHaveClass('max-w-md');
    expect(btn).toHaveClass('mx-auto');
  });

  it('omits width classes when fullWidth={false}', () => {
    render(<PrimaryButton fullWidth={false}>Save</PrimaryButton>);
    const btn = screen.getByRole('button');
    expect(btn).not.toHaveClass('w-full');
    expect(btn).not.toHaveClass('max-w-md');
    expect(btn).not.toHaveClass('mx-auto');
  });

  it('fires onClick when enabled', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();

    render(<PrimaryButton onClick={handler}>Tap</PrimaryButton>);
    await user.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();

    render(
      <PrimaryButton disabled onClick={handler}>
        Tap
      </PrimaryButton>
    );
    await user.click(screen.getByRole('button'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('forwards arbitrary props (e.g., type, className)', () => {
    render(
      <PrimaryButton
        type="submit"
        className="custom-class"
        aria-label="submit form"
      />
    );
    const btn = screen.getByRole('button', { name: 'submit form' });
    expect(btn).toHaveAttribute('type', 'submit');
    expect(btn).toHaveClass('custom-class');
  });
});
