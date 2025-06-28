import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import SimpleContainer from '../Container';

describe('<SimpleContainer />', () => {
  it('renders CssBaseline and Container', () => {
    render(<SimpleContainer>child</SimpleContainer>);
    expect(screen.getByTestId('mui-cssbaseline')).toBeInTheDocument();
    expect(screen.getByTestId('mui-container')).toBeInTheDocument();
  });

  it('passes the correct props to Container', () => {
    render(<SimpleContainer>child</SimpleContainer>);
    const container = screen.getByTestId('mui-container');

    expect(container).toHaveAttribute('data-maxwidth', 'md');
    expect(container).toHaveAttribute('data-disable-gutters', 'true');

    expect(container).toHaveStyle('min-height: 100vh');
    expect(container).toHaveStyle('display: flex');
    expect(container).toHaveStyle('flex-direction: column');
    expect(container).toHaveStyle('background-color: rgb(255, 255, 255)');
  });

  it('renders its children inside the Container', () => {
    render(
      <SimpleContainer>
        <span>inside</span>
      </SimpleContainer>
    );
    const inside = screen.getByText('inside');
    expect(inside).toBeInTheDocument();
    expect(inside.closest('[data-testid="mui-container"]')).not.toBeNull();
  });
});
