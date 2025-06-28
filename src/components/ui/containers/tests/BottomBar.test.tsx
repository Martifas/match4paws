import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BottomBar from '../BottomBar';

describe('<BottomBar />', () => {
  it('renders its children', () => {
    render(
      <BottomBar>
        <span>Hello</span>
      </BottomBar>
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies responsive classes by default', () => {
    render(
      <BottomBar>
        <span>X</span>
      </BottomBar>
    );
    const bar = screen.getByText('X').parentElement as HTMLElement;
    expect(bar).toHaveClass('lg:static');
    expect(bar).not.toHaveClass('fixed');
  });

  it('adds sticky classes when alwaysSticky is true', () => {
    render(
      <BottomBar alwaysSticky>
        <span>Y</span>
      </BottomBar>
    );
    const bar = screen.getByText('Y').parentElement as HTMLElement;
    expect(bar).toHaveClass('fixed');
    expect(bar).toHaveClass('bottom-0');
    expect(bar).not.toHaveClass('lg:static');
  });

  it('merges custom className', () => {
    render(
      <BottomBar className="extra">
        <span>Z</span>
      </BottomBar>
    );
    const bar = screen.getByText('Z').parentElement as HTMLElement;
    expect(bar).toHaveClass('extra');
  });
});
