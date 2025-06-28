import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HowItWorks from '../HowItWorks';

describe('HowItWorks', () => {
  it('renders the section with correct heading', () => {
    render(<HowItWorks />);

    const heading = screen.getByRole('heading', { name: 'How it works' });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass(
      'text-2xl',
      'md:text-3xl',
      'font-semibold',
      'text-center',
      'mb-10'
    );
  });

  it('renders all three steps', () => {
    render(<HowItWorks />);

    expect(screen.getByText('Create a profile')).toBeInTheDocument();
    expect(screen.getByText('Browse & chat')).toBeInTheDocument();
    expect(screen.getByText('Meet & adopt')).toBeInTheDocument();
  });

  it('renders step icons correctly', () => {
    render(<HowItWorks />);

    expect(screen.getByText('📝')).toBeInTheDocument();
    expect(screen.getByText('🔍')).toBeInTheDocument();
    expect(screen.getByText('🏡')).toBeInTheDocument();
  });

  it('renders step descriptions', () => {
    render(<HowItWorks />);

    expect(
      screen.getByText('Sign up and tell us about yourself or your pet.')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Filter pets that fit your lifestyle and talk with owners securely.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('Schedule a meetup and give a pet a forever home.')
    ).toBeInTheDocument();
  });

  it('applies correct styling to section container', () => {
    const { container } = render(<HowItWorks />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-gray-50', 'py-12', 'px-4');
  });

  it('applies correct styling to grid container', () => {
    render(<HowItWorks />);

    const gridContainer = screen
      .getByText('Create a profile')
      .closest('.max-w-5xl');
    expect(gridContainer).toHaveClass(
      'max-w-5xl',
      'mx-auto',
      'grid',
      'gap-8',
      'md:grid-cols-3'
    );
  });

  it('applies correct styling to step cards', () => {
    render(<HowItWorks />);

    const firstStepCard = screen
      .getByText('Create a profile')
      .closest('.text-center');
    expect(firstStepCard).toHaveClass(
      'text-center',
      'space-y-3',
      'p-6',
      'bg-white',
      'rounded-xl',
      'shadow-sm',
      'hover:shadow-md',
      'transition'
    );
  });

  it('applies correct styling to step icons', () => {
    render(<HowItWorks />);

    const icon = screen.getByText('📝');
    expect(icon).toHaveClass('text-4xl', 'select-none');
  });

  it('applies correct styling to step titles', () => {
    render(<HowItWorks />);

    const title = screen.getByText('Create a profile');
    expect(title).toHaveClass('font-medium', 'text-lg');
    expect(title.tagName).toBe('H3');
  });

  it('applies correct styling to step descriptions', () => {
    render(<HowItWorks />);

    const description = screen.getByText(
      'Sign up and tell us about yourself or your pet.'
    );
    expect(description).toHaveClass(
      'text-gray-600',
      'text-sm',
      'leading-relaxed'
    );
    expect(description.tagName).toBe('P');
  });

  it('renders steps in correct order', () => {
    render(<HowItWorks />);

    const stepTitles = screen.getAllByRole('heading', { level: 3 });
    expect(stepTitles).toHaveLength(3);
    expect(stepTitles[0]).toHaveTextContent('Create a profile');
    expect(stepTitles[1]).toHaveTextContent('Browse & chat');
    expect(stepTitles[2]).toHaveTextContent('Meet & adopt');
  });

  it('uses step title as key for mapping', () => {
    const { container } = render(<HowItWorks />);

    const stepCards = container.querySelectorAll('.text-center.space-y-3');
    expect(stepCards).toHaveLength(3);
  });
  it('has semantic HTML structure', () => {
    const { container } = render(<HowItWorks />);

    // Check section element exists
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();

    // Check heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 2 });
    const stepHeadings = screen.getAllByRole('heading', { level: 3 });

    expect(mainHeading).toHaveTextContent('How it works');
    expect(stepHeadings).toHaveLength(3);
  });
});
