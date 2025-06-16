import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import UnitConverter from '../UnitConverter';

const renderWidget = () => render(<UnitConverter />);

describe('UnitConverter Widget', () => {
  it('renders category select and convert button', () => {
    renderWidget();
    expect(screen.getByTestId('category-select')).toBeInTheDocument();
    expect(screen.getByTestId('convert-btn')).toBeInTheDocument();
  });

  it('performs conversion', async () => {
    const user = userEvent.setup();
    renderWidget();

    const valueInput = screen.getByTestId('value-input');
    await user.type(valueInput, '1');

    const convertBtn = screen.getByTestId('convert-btn');
    await user.click(convertBtn);

    expect(screen.getByTestId('result')).toBeInTheDocument();
  });
});