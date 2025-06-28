/* ToggleChip.test.tsx */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ToggleChip, { ToggleValue } from '../ToggleChip';

type Item = string | { id: string; label?: string; icon?: React.ReactNode };
type ItemsArr = readonly Item[];

function renderToggle<T extends ItemsArr>(opts: {
  items: T;
  selected: ToggleValue<T>;
  onChange?: (v: ToggleValue<T>) => void;
  getId?: (item: T[number]) => string;
}) {
  const user = userEvent.setup();
  const onChange = opts.onChange ?? vi.fn();

  render(
    <ToggleChip
      items={opts.items}
      selected={opts.selected}
      onChange={onChange}
      getId={opts.getId}
      render={(item, active) =>
        typeof item === 'string'
          ? item
          : (item.label ?? item.id + (active ? ' ✓' : ''))
      }
    />
  );
  return { user, onChange };
}

describe('<ToggleChip />', () => {
  const fruit = ['Apple', 'Banana', 'Cherry'] as const;
  const pets = [
    { id: 'dog', label: 'Dog' },
    { id: 'cat', label: 'Cat' },
  ] as const;

  it('renders one button per item', () => {
    renderToggle({ items: fruit, selected: null });
    expect(screen.getAllByRole('button')).toHaveLength(fruit.length);
  });

  it('selects an item and calls onChange with its id', async () => {
    const { user, onChange } = renderToggle({ items: fruit, selected: null });
    await user.click(screen.getByRole('button', { name: 'Banana' }));
    expect(onChange).toHaveBeenCalledWith('Banana');
  });

  it('unselects the active item and calls onChange with null', async () => {
    const { user, onChange } = renderToggle({
      items: fruit,
      selected: 'Apple',
    });
    await user.click(screen.getByRole('button', { name: 'Apple' }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('applies the active style only to the selected chip', () => {
    renderToggle({ items: fruit, selected: 'Cherry' });
    const active = screen.getByRole('button', { name: 'Cherry' });
    const inactive = screen.getByRole('button', { name: 'Banana' });
    expect(active).toHaveClass('bg-orange-500');
    expect(inactive).not.toHaveClass('bg-orange-500');
  });

  it('works with object items using the default getId', async () => {
    const { user, onChange } = renderToggle({ items: pets, selected: null });
    await user.click(screen.getByRole('button', { name: 'Dog' }));
    expect(onChange).toHaveBeenCalledWith('dog');
  });

  it('honours a custom getId function', async () => {
    const { user, onChange } = renderToggle({
      items: pets,
      selected: null,
      getId: item => (item as { label: string }).label,
    });
    await user.click(screen.getByRole('button', { name: 'Cat' }));
    expect(onChange).toHaveBeenCalledWith('Cat');
  });
});
