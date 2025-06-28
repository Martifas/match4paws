import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from '../Header';

describe('<Header />', () => {
  it('renders direct children when provided', () => {
    render(
      <Header>
        <h1>Custom header</h1>
      </Header>
    );
    expect(screen.getByText('Custom header')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toHaveTextContent('Custom header');
  });

  it('renders left, center and right slots when children absent', () => {
    render(<Header left="L" center="C" right="R" />);
    const banner = screen.getByRole('banner');
    const [left, center, right] = banner.querySelectorAll('div');
    expect(left).toHaveTextContent('L');
    expect(center).toHaveTextContent('C');
    expect(right).toHaveTextContent('R');
  });

  it('has the expected base classes', () => {
    render(<Header left="x" />);
    const banner = screen.getByRole('banner');
    expect(banner).toHaveClass('flex');
    expect(banner).toHaveClass('items-center');
    expect(banner).toHaveClass('justify-between');
  });
});
