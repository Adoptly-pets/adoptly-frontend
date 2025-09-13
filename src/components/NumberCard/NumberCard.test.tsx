import { render, screen } from '@testing-library/react';
import NumberCard from './NumberCard';

describe('NumberCard', () => {
  const mockProps = {
    cardNumber: '01',
    cardText: 'Hello World Test',
  };

  it('renders without crashing', () => {
    render(<NumberCard {...mockProps} />);
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('displays the card number correctly', () => {
    render(<NumberCard {...mockProps} />);
    const numberElement = screen.getByText('01');
    expect(numberElement).toHaveClass('number');
  });

  it('splits and displays the card text correctly', () => {
    render(<NumberCard {...mockProps} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World Test')).toBeInTheDocument();
  });

  it('has correct container class', () => {
    render(<NumberCard {...mockProps} />);
    const container = screen.getByText('01').parentElement;
    expect(container).toHaveClass('number-card');
  });

  it('handles single word cardText correctly', () => {
    render(<NumberCard cardNumber="02" cardText="Single" />);
    expect(screen.getByText('Single')).toBeInTheDocument();
    const emptyElements = screen.queryAllByText('');
    expect(emptyElements.length).toBeGreaterThan(0);
  });
});