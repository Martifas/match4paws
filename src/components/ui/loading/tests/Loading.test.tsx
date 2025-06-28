import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

vi.mock('@/assets/icons/PawIcon', () => ({
  default: ({ className }: { className?: string }) => (
    <div data-testid="paw-icon" className={className}>
      🐾
    </div>
  ),
}));

vi.mock('@mui/material/CircularProgress', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ color, size, thickness, sx }: any) => (
    <div
      data-testid="circular-progress"
      data-color={color}
      data-size={size}
      data-thickness={thickness}
      style={sx}
    >
      Loading...
    </div>
  ),
}));

describe('Loading', () => {
  it('should render heading text', () => {
    render(<Loading />);
    expect(screen.getByText('Match4Paws')).toBeInTheDocument();
  });

  it('should render description text', () => {
    render(<Loading />);
    expect(
      screen.getByText('Finding your perfect pet match...')
    ).toBeInTheDocument();
  });

  it('should render paw icon', () => {
    render(<Loading />);
    expect(screen.getByTestId('paw-icon')).toBeInTheDocument();
  });

  it('should render circular progress', () => {
    render(<Loading />);
    expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
  });

  it('should apply correct props to circular progress', () => {
    render(<Loading />);
    const progress = screen.getByTestId('circular-progress');
    expect(progress).toHaveAttribute('data-color', 'inherit');
    expect(progress).toHaveAttribute('data-size', '48');
    expect(progress).toHaveAttribute('data-thickness', '4');
  });

  it('should apply animate-pulse class to paw icon container', () => {
    render(<Loading />);
    const pawIcon = screen.getByTestId('paw-icon');
    expect(pawIcon.parentElement).toHaveClass('animate-pulse');
  });

  it('should apply correct styling classes', () => {
    const { container } = render(<Loading />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'min-h-screen',
      'bg-[#ed9426]'
    );
  });
});
