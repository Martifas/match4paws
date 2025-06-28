import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatBadge from '../StatBadge';

describe('StatBadge', () => {
  const defaultProps = {
    label: 'Total Pets',
    value: '42',
  };

  it('should render label and value', () => {
    render(<StatBadge {...defaultProps} />);

    expect(screen.getByText('Total Pets')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should apply default red color when no color is specified', () => {
    render(<StatBadge {...defaultProps} />);

    const container = screen.getByText('Total Pets').parentElement;
    expect(container).toHaveClass('bg-red-100');
  });

  it('should apply red background color', () => {
    render(<StatBadge {...defaultProps} color="red" />);

    const container = screen.getByText('Total Pets').parentElement;
    expect(container).toHaveClass('bg-red-100');
  });

  it('should apply blue background color', () => {
    render(<StatBadge {...defaultProps} color="blue" />);

    const container = screen.getByText('Total Pets').parentElement;
    expect(container).toHaveClass('bg-blue-100');
  });

  it('should apply green background color', () => {
    render(<StatBadge {...defaultProps} color="green" />);

    const container = screen.getByText('Total Pets').parentElement;
    expect(container).toHaveClass('bg-green-100');
  });

  it('should apply orange background color', () => {
    render(<StatBadge {...defaultProps} color="orange" />);

    const container = screen.getByText('Total Pets').parentElement;
    expect(container).toHaveClass('bg-orange-100');
  });

  it('should apply additional className when provided', () => {
    render(<StatBadge {...defaultProps} className="custom-class" />);

    const container = screen.getByText('Total Pets').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('should combine base classes with color and custom className', () => {
    render(
      <StatBadge {...defaultProps} color="blue" className="custom-class" />
    );

    const container = screen.getByText('Total Pets').parentElement;
    expect(container).toHaveClass(
      'flex',
      'flex-col',
      'justify-center',
      'items-center',
      'rounded-md',
      'h-18',
      'text-center',
      'flex-1',
      'bg-blue-100',
      'custom-class'
    );
  });

  it('should apply correct styling to label text', () => {
    render(<StatBadge {...defaultProps} />);

    const label = screen.getByText('Total Pets');
    expect(label).toHaveClass('text-gray-500');
    expect(label.tagName).toBe('SPAN');
  });

  it('should apply correct styling to value text', () => {
    render(<StatBadge {...defaultProps} />);

    const value = screen.getByText('42');
    expect(value).toHaveClass('font-bold');
    expect(value.tagName).toBe('SPAN');
  });

  it('should handle empty strings for label and value', () => {
    const { container } = render(<StatBadge label="" value="" />);

    const statBadge = container.firstChild as HTMLElement;
    expect(statBadge).toBeInTheDocument();
    expect(statBadge).toHaveClass('bg-red-100');
  });

  it('should handle numeric values as strings', () => {
    render(<StatBadge label="Count" value="123" />);

    expect(screen.getByText('Count')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('should handle long text values', () => {
    render(
      <StatBadge
        label="Very Long Label Text That Might Wrap"
        value="Very Long Value Text That Might Also Wrap"
      />
    );

    expect(
      screen.getByText('Very Long Label Text That Might Wrap')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Very Long Value Text That Might Also Wrap')
    ).toBeInTheDocument();
  });

  it('should maintain structure with all props', () => {
    render(
      <StatBadge
        label="Active Pets"
        value="25"
        color="green"
        className="mt-4 shadow-lg"
      />
    );

    const container = screen.getByText('Active Pets').parentElement;
    const label = screen.getByText('Active Pets');
    const value = screen.getByText('25');

    expect(container).toHaveClass('bg-green-100', 'mt-4', 'shadow-lg');
    expect(label).toHaveClass('text-gray-500');
    expect(value).toHaveClass('font-bold');
  });

  it('should handle special characters in label and value', () => {
    render(<StatBadge label="Pets @ Shelter" value="$1,234" />);

    expect(screen.getByText('Pets @ Shelter')).toBeInTheDocument();
    expect(screen.getByText('$1,234')).toBeInTheDocument();
  });
});
