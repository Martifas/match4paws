import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import StepIndicator from '../StepIndicator';

describe('StepIndicator', () => {
  it('should render correct number of steps', () => {
    const { container } = render(
      <StepIndicator totalSteps={3} activeStep={0} />
    );
    const steps = container.querySelectorAll('div > div > div');
    expect(steps).toHaveLength(3);
  });

  it('should highlight active step', () => {
    const { container } = render(
      <StepIndicator totalSteps={3} activeStep={1} />
    );
    const steps = container.querySelectorAll('div > div > div');
    expect(steps[1]).toHaveClass('bg-[#ed9426]', 'w-10', 'h-3');
  });

  it('should apply inactive styles to non-active steps', () => {
    const { container } = render(
      <StepIndicator totalSteps={3} activeStep={1} />
    );
    const steps = container.querySelectorAll('div > div > div');
    expect(steps[0]).toHaveClass('bg-gray-300', 'w-3', 'h-3');
    expect(steps[2]).toHaveClass('bg-gray-300', 'w-3', 'h-3');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <StepIndicator totalSteps={3} activeStep={0} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render with single step', () => {
    const { container } = render(
      <StepIndicator totalSteps={1} activeStep={0} />
    );
    const steps = container.querySelectorAll('div > div > div');
    expect(steps).toHaveLength(1);
    expect(steps[0]).toHaveClass('bg-[#ed9426]');
  });

  it('should handle zero steps', () => {
    const { container } = render(
      <StepIndicator totalSteps={0} activeStep={0} />
    );
    const steps = container.querySelectorAll('div > div > div');
    expect(steps).toHaveLength(0);
  });

  it('should handle activeStep beyond totalSteps', () => {
    const { container } = render(
      <StepIndicator totalSteps={3} activeStep={5} />
    );
    const steps = container.querySelectorAll('div > div > div');
    steps.forEach(step => {
      expect(step).toHaveClass('bg-gray-300');
    });
  });

  it('should handle negative activeStep', () => {
    const { container } = render(
      <StepIndicator totalSteps={3} activeStep={-1} />
    );
    const steps = container.querySelectorAll('div > div > div');
    steps.forEach(step => {
      expect(step).toHaveClass('bg-gray-300');
    });
  });

  it('should apply base classes to all steps', () => {
    const { container } = render(
      <StepIndicator totalSteps={2} activeStep={0} />
    );
    const steps = container.querySelectorAll('div > div > div');
    steps.forEach(step => {
      expect(step).toHaveClass(
        'h-2',
        'rounded-full',
        'transition-all',
        'duration-300'
      );
    });
  });

  it('should apply correct container classes', () => {
    const { container } = render(
      <StepIndicator totalSteps={3} activeStep={0} />
    );
    expect(container.firstChild).toHaveClass('flex', 'justify-center', 'gap-2');
  });
});
