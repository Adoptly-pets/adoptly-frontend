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

  it('displays the card number with the correct class', () => {
    render(<NumberCard {...mockProps} />);
    const numberElement = screen.getByText('01');
    expect(numberElement).toHaveClass('number-card__number');
  });

  it('splits and displays the card text correctly', () => {
    render(<NumberCard {...mockProps} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World Test')).toBeInTheDocument();
  });

  it('renders the container with the correct class', () => {
    render(<NumberCard {...mockProps} />);
    const container = screen.getByText('01').closest('.number-card');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('number-card');
  });

  it('handles single word cardText correctly', () => {
    render(<NumberCard cardNumber="02" cardText="Single" />);
    expect(screen.getByText('Single')).toBeInTheDocument();
    // Ensure no additional empty spans are rendered
    const textElements = screen.getAllByText('Single');
    expect(textElements.length).toBe(1);
  });

  it('handles empty cardText gracefully', () => {
    render(<NumberCard cardNumber="03" cardText="" />);
    const numberElement = screen.getByText('03');
    expect(numberElement).toBeInTheDocument();

    const textContainer = numberElement.nextElementSibling;
    expect(textContainer).toBeInTheDocument();
    expect(textContainer).toBeEmptyDOMElement();
  });

  it('handles empty cardNumber gracefully', () => {
    render(<NumberCard cardNumber="" cardText="Empty Number" />);
    const placeholderElement = screen.getByText('—');
    expect(placeholderElement).toBeInTheDocument();
    expect(screen.getByText('Empty')).toBeInTheDocument();
    expect(screen.getByText('Number')).toBeInTheDocument();
  });
});
