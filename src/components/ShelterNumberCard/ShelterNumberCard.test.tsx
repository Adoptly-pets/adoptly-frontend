import { render, screen } from '@testing-library/react';
import ShelterNumberCard from './ShelterNumberCard';

describe('ShelterNumberCard', () => {
  it('renders cardNumber and splits cardText', () => {
    render(<ShelterNumberCard cardNumber="123" cardText="Dogs adopted" />);
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Dogs')).toBeInTheDocument();
    expect(screen.getByText('adopted')).toBeInTheDocument();
  });

  it('renders dash if cardNumber is not provided', () => {
    render(<ShelterNumberCard cardText="Cats fostered" />);
    expect(screen.getByText('—')).toBeInTheDocument();
    expect(screen.getByText('Cats')).toBeInTheDocument();
    expect(screen.getByText('fostered')).toBeInTheDocument();
  });

  it('handles single-word cardText', () => {
    render(<ShelterNumberCard cardNumber="5" cardText="Volunteers" />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Volunteers')).toBeInTheDocument();
  });
});
