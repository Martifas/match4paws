/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultiToggleChip, { MultiToggleValue } from '../MultiToggleChip';

const setup = (opts: {
  items: readonly any[];
  selected?: MultiToggleValue;
  onChange?: (v: MultiToggleValue) => void;
  getId?: (item: any) => string;
}) => {
  const { items, selected = [], onChange = vi.fn(), getId } = opts;

  const user = userEvent.setup();
  render(
    <MultiToggleChip
      items={items}
      selected={selected}
      onChange={onChange}
      getId={getId}
      render={(item, active) =>
        typeof item === 'string'
          ? item
          : (item.label ?? item.id + (active ? ' ✓' : ''))
      }
    />
  );
  return { user, onChange };
};

describe('<MultiToggleChip />', () => {
  const strItems = ['Apple', 'Banana', 'Cherry'] as const;
  const objItems = [
    { id: 'dog', label: 'Dog' },
    { id: 'cat', label: 'Cat' },
  ] as const;

  it('renders a button for every item', () => {
    setup({ items: strItems });
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(strItems.length);
    strItems.forEach(label =>
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
    );
  });

  it('calls onChange with added id when clicking an un-selected chip', async () => {
    const { user, onChange } = setup({ items: strItems, selected: [] });
    await user.click(screen.getByRole('button', { name: 'Banana' }));
    expect(onChange).toHaveBeenCalledWith(['Banana']);
  });

  it('calls onChange with removed id when clicking a selected chip', async () => {
    const { user, onChange } = setup({
      items: strItems,
      selected: ['Cherry'],
    });
    await user.click(screen.getByRole('button', { name: 'Cherry' }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('applies the active styling class for selected chips', () => {
    setup({ items: strItems, selected: ['Apple'] });
    const activeBtn = screen.getByRole('button', { name: 'Apple' });
    const inactiveBtn = screen.getByRole('button', { name: 'Cherry' });
    expect(activeBtn).toHaveClass('bg-orange-500');
    expect(inactiveBtn).not.toHaveClass('bg-orange-500');
  });

  it('works with object items and the default getId', async () => {
    const { user, onChange } = setup({ items: objItems, selected: [] });
    await user.click(screen.getByRole('button', { name: 'Dog' }));
    expect(onChange).toHaveBeenCalledWith(['dog']);
  });

  it('honours a custom getId function', async () => {
    const customGetId = (item: { label: string }) => item.label;
    const { user, onChange } = setup({
      items: objItems,
      selected: [],
      getId: customGetId,
    });
    await user.click(screen.getByRole('button', { name: 'Cat' }));
    expect(onChange).toHaveBeenCalledWith(['Cat']);
  });
});
