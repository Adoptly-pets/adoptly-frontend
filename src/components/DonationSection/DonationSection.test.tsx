import { render, screen, fireEvent } from '@testing-library/react';
import DonationSection from './DonationSection';

window.alert = jest.fn();

describe('DonationSection', () => {
  test('renders heading and preset amount buttons', () => {
    render(<DonationSection />);
    expect(screen.getByText(/Бажаєш підтримати тварин/i)).toBeInTheDocument();
    expect(screen.getByText('100 грн')).toBeInTheDocument();
    expect(screen.getByText('250 грн')).toBeInTheDocument();
    expect(screen.getByText('500 грн')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Вказати іншу суму')
    ).toBeInTheDocument();
    expect(screen.getByText('Задонатити')).toBeInTheDocument();
  });

  test('selects donation amount via button', () => {
    render(<DonationSection />);
    fireEvent.click(screen.getByText('250 грн'));
    fireEvent.submit(screen.getByRole('form'));
    expect(window.alert).toHaveBeenCalledWith('Донат відправлено: 250');
  });

  test('enters custom donation amount', () => {
    render(<DonationSection />);
    const input = screen.getByPlaceholderText('Вказати іншу суму');
    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(window.alert).toHaveBeenCalledWith('Донат відправлено: 123');
  });

  test('changes placeholder on window resize', () => {
    render(<DonationSection />);
    window.innerWidth = 500;
    fireEvent(window, new Event('resize'));
    expect(screen.getByPlaceholderText('Інша сума')).toBeInTheDocument();
  });
});
