import { render, screen } from '@testing-library/react';
import HappyStoryCard, { HappyStoryCardProps } from './HappyStoryCard';

describe('HappyStoryCard Component', () => {
  const mockProps: HappyStoryCardProps = {
    src: 'test-image.jpg',
    name: 'John Doe',
    description: ['This is the first paragraph.', 'This is the second paragraph.'],
  };

  it('renders without crashing', () => {
    render(<HappyStoryCard {...mockProps} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('This is the first paragraph.')).toBeInTheDocument();
    expect(screen.getByText('This is the second paragraph.')).toBeInTheDocument();
  });

  it('renders the image with correct src attribute', () => {
    render(<HappyStoryCard {...mockProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test-image.jpg');
  });

  it('renders the name as a heading', () => {
    render(<HappyStoryCard {...mockProps} />);
    const heading = screen.getByRole('heading', { name: /john doe/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders all paragraphs in the description', () => {
    render(<HappyStoryCard {...mockProps} />);
    mockProps.description.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('renders a <br /> tag after each paragraph', () => {
    const { container } = render(<HappyStoryCard {...mockProps} />);
    const paragraphs = screen.getAllByText(/This is the/); // Match all paragraphs
    const brTags = container.querySelectorAll('br'); // Find all <br /> tags

    expect(paragraphs.length).toBe(mockProps.description.length);
    expect(brTags.length).toBe(mockProps.description.length); // Ensure <br /> count matches paragraphs
  });
});