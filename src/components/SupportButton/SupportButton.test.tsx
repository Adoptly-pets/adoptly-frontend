import { render, screen } from '@testing-library/react';
import SupportButton from './SupportButton';

jest.mock('./SupportButton.css', () => ({}));

describe('SupportButton', () => {
  const mockProps = {
    imgSrc: 'test-image.jpg',
    altText: 'Support Image',
    text: 'Click Me',
    ariaLabel: 'Support Button',
  };

  beforeEach(() => {
    render(<SupportButton {...mockProps} />);
  });

  it('renders the button with correct aria-label', () => {
    const button = screen.getByRole('button', { name: /Support Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Support Button');
  });

  it('renders the image with correct src and alt', () => {
    const img = screen.getByAltText('Support Image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test-image.jpg');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('renders the text correctly', () => {
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
});
