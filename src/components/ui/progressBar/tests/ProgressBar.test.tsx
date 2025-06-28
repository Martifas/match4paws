/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ProgressBar from '../ProgressBar';

vi.mock('@mui/material/Box', () => {
  const Box = ({ children, sx, ...rest }: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'mui-box', style: sx, ...rest },
      children
    );
  Box.displayName = 'MuiBox';
  return { __esModule: true, default: Box };
});

vi.mock('@mui/material/LinearProgress', () => {
  const LinearProgress = ({ value, variant, sx, ...rest }: any) =>
    React.createElement('div', {
      'data-testid': 'mui-progress',
      'data-value': value,
      'data-variant': variant,
      style: sx,
      ...rest,
    });
  LinearProgress.displayName = 'MuiLinearProgress';
  return { __esModule: true, default: LinearProgress };
});

describe('<ProgressBar />', () => {
  it('renders with correct value and styles', () => {
    render(<ProgressBar value={60} />);
    const box = screen.getByTestId('mui-box');
    const progress = screen.getByTestId('mui-progress');
    expect(box).toHaveStyle('width: 80%');
    expect(progress).toHaveAttribute('data-variant', 'determinate');
    expect(progress).toHaveAttribute('data-value', '60');
  });

  it('updates when value prop changes', () => {
    const { rerender } = render(<ProgressBar value={20} />);
    expect(screen.getByTestId('mui-progress')).toHaveAttribute(
      'data-value',
      '20'
    );
    rerender(<ProgressBar value={80} />);
    expect(screen.getByTestId('mui-progress')).toHaveAttribute(
      'data-value',
      '80'
    );
  });
});
