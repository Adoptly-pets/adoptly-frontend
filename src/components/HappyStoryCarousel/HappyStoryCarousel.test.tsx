import { render, screen, fireEvent } from '@testing-library/react';
import HappyStoryCarousel from './HappyStoryCarousel';
import type { HappyStoryCardProps } from '../HappyStoryCard/HappyStoryCard';

jest.mock('../HappyStoryCard/HappyStoryCard', () => ({
  __esModule: true,
  default: ({ src, name }: HappyStoryCardProps) => (
    <div data-testid="happy-story-card">
      <img src={src} alt={name} />
      <h3>{name}</h3>
    </div>
  ),
}));

describe('HappyStoryCarousel Component', () => {
  const mockStories: HappyStoryCardProps[] = [
    {
      src: 'image1.jpg',
      name: 'Story 1',
      description: ['Description 1'],
    },
    {
      src: 'image2.jpg',
      name: 'Story 2',
      description: ['Description 2'],
    },
    {
      src: 'image3.jpg',
      name: 'Story 3',
      description: ['Description 3'],
    },
  ];

  test('renders the first story by default', () => {
    render(<HappyStoryCarousel stories={mockStories} />);

    const storyCard = screen.getByTestId('happy-story-card');
    expect(storyCard).toBeInTheDocument();
    expect(screen.getByText('Story 1')).toBeInTheDocument();
    expect(screen.getByAltText('Story 1')).toHaveAttribute('src', 'image1.jpg');
  });

  test('navigates to the next story when the next button is clicked', () => {
    render(<HappyStoryCarousel stories={mockStories} />);

    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    expect(screen.getByText('Story 2')).toBeInTheDocument();
    expect(screen.getByAltText('Story 2')).toHaveAttribute('src', 'image2.jpg');
  });

  test('navigates to the previous story when the previous button is clicked', () => {
    render(<HappyStoryCarousel stories={mockStories} />);

    const prevButton = screen.getByRole('button', { name: /Previous/i });
    fireEvent.click(prevButton);

    expect(screen.getByText('Story 3')).toBeInTheDocument();
    expect(screen.getByAltText('Story 3')).toHaveAttribute('src', 'image3.jpg');
  });

  test('loops to the last story when previous is clicked on the first story', () => {
    render(<HappyStoryCarousel stories={mockStories} />);

    const prevButton = screen.getByRole('button', { name: /Previous/i });
    fireEvent.click(prevButton);

    expect(screen.getByText('Story 3')).toBeInTheDocument();
    expect(screen.getByAltText('Story 3')).toHaveAttribute('src', 'image3.jpg');
  });

  test('loops to the first story when next is clicked on the last story', () => {
    render(<HappyStoryCarousel stories={mockStories} />);

    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton); // Move to Story 2
    fireEvent.click(nextButton); // Move to Story 3
    fireEvent.click(nextButton); // Loop back to Story 1

    expect(screen.getByText('Story 1')).toBeInTheDocument();
    expect(screen.getByAltText('Story 1')).toHaveAttribute('src', 'image1.jpg');
  });

  test('renders indicators with correct active state', () => {
    render(<HappyStoryCarousel stories={mockStories} />);

    const indicators = screen.getAllByRole('presentation'); // Assuming indicators are spans
    expect(indicators).toHaveLength(mockStories.length);
    expect(indicators[0]).toHaveClass('dot active');
    expect(indicators[1]).toHaveClass('dot');
    expect(indicators[2]).toHaveClass('dot');

    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    expect(indicators[0]).toHaveClass('dot');
    expect(indicators[1]).toHaveClass('dot active');
    expect(indicators[2]).toHaveClass('dot');
  });
});
