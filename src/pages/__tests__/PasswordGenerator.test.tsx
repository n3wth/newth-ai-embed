import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import PasswordGenerator from '../PasswordGenerator';

const renderWidget = () => render(<PasswordGenerator />);

describe('PasswordGenerator Widget', () => {
  it('renders the UI elements', () => {
    renderWidget();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Password Generator');
    expect(screen.getByTestId('length-slider')).toBeInTheDocument();
    expect(screen.getByTestId('generate-btn')).toBeInTheDocument();
  });

  it('generates a password when clicking generate', async () => {
    const user = userEvent.setup();
    renderWidget();

    const generateBtn = screen.getByTestId('generate-btn');
    await user.click(generateBtn);

    const output = screen.getByTestId('password-output') as HTMLInputElement;
    expect(output.value.length).toBeGreaterThan(0);
  });

  it('updates length when slider changes', async () => {
    renderWidget();

    const slider = screen.getByTestId('length-slider') as HTMLInputElement;
    expect(slider.value).toBe('12');
    fireEvent.change(slider, { target: { value: 20 } });
    expect(slider.value).toBe('20');
  });
});