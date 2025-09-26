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

  const VIEWPORT_WIDTH = 800;
  let originalClientWidthDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    originalClientWidthDescriptor = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'clientWidth'
    );
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => VIEWPORT_WIDTH,
    });
  });

  afterEach(() => {
    if (originalClientWidthDescriptor) {
      Object.defineProperty(
        HTMLElement.prototype,
        'clientWidth',
        originalClientWidthDescriptor
      );
    } else {
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
        configurable: true,
        get: () => undefined,
      });
    }
  });

  test('renders the first story by default and indicators reflect active state', () => {
    const { container } = render(<HappyStoryCarousel stories={mockStories} />);

    const cards = screen.getAllByTestId('happy-story-card');
    expect(cards.length).toBeGreaterThan(0);
    const firstCard = cards[0];
    expect(firstCard).toBeInTheDocument();
    expect(firstCard).toHaveTextContent('Story 1');
    const img = firstCard.querySelector('img');
    expect(img).toHaveAttribute('src', 'image1.jpg');

    const track = container.querySelector('.happy-story-track') as HTMLElement;
    expect(track).toBeTruthy();
    expect(track.style.transform).toBe(`translateX(0px)`);

    const indicators = screen.getAllByRole('presentation');
    expect(indicators).toHaveLength(mockStories.length);
    expect(indicators[0]).toHaveClass('dot active');
    expect(indicators[1]).toHaveClass('dot');
    expect(indicators[2]).toHaveClass('dot');
  });

  test('navigates to the next story when the next button is clicked', () => {
    const { container } = render(<HappyStoryCarousel stories={mockStories} />);

    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    const track = container.querySelector('.happy-story-track') as HTMLElement;
    expect(track.style.transform).toBe(`translateX(-${VIEWPORT_WIDTH}px)`);

    const indicators = screen.getAllByRole('presentation');
    expect(indicators[0]).toHaveClass('dot');
    expect(indicators[1]).toHaveClass('dot active');
  });

  test('navigates to the previous story when the previous button is clicked', () => {
    const { container } = render(<HappyStoryCarousel stories={mockStories} />);

    const prevButton = screen.getByRole('button', { name: /Previous/i });
    fireEvent.click(prevButton);

    const track = container.querySelector('.happy-story-track') as HTMLElement;
    expect(track.style.transform).toBe(`translateX(-${VIEWPORT_WIDTH * 2}px)`); // index 2

    const indicators = screen.getAllByRole('presentation');
    expect(indicators[2]).toHaveClass('dot active');
  });

  test('loops to the first story when next is clicked on the last story', () => {
    const { container } = render(<HappyStoryCarousel stories={mockStories} />);

    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    const track = container.querySelector('.happy-story-track') as HTMLElement;
    expect(track.style.transform).toBe(`translateX(0px)`);

    const indicators = screen.getAllByRole('presentation');
    expect(indicators[0]).toHaveClass('dot active');
  });

  test('swipe left (touch) navigates to next story', () => {
    const { container } = render(<HappyStoryCarousel stories={mockStories} />);

    const viewport = container.querySelector(
      '.happy-story-viewport'
    ) as HTMLElement;
    expect(viewport).toBeTruthy();

    fireEvent.touchStart(viewport, {
      touches: [{ clientX: 800 }],
    });
    fireEvent.touchMove(viewport, {
      touches: [{ clientX: 100 }],
    });
    fireEvent.touchEnd(viewport);

    const track = container.querySelector('.happy-story-track') as HTMLElement;
    expect(track.style.transform).toBe(`translateX(-${VIEWPORT_WIDTH}px)`);

    const indicators = screen.getAllByRole('presentation');
    expect(indicators[1]).toHaveClass('dot active');
  });

  test('swipe right (touch) navigates to previous story', () => {
    const { container } = render(<HappyStoryCarousel stories={mockStories} />);

    const viewport = container.querySelector(
      '.happy-story-viewport'
    ) as HTMLElement;
    expect(viewport).toBeTruthy();

    fireEvent.touchStart(viewport, {
      touches: [{ clientX: 100 }],
    });
    fireEvent.touchMove(viewport, {
      touches: [{ clientX: 800 }],
    });
    fireEvent.touchEnd(viewport);

    const track = container.querySelector('.happy-story-track') as HTMLElement;
    expect(track.style.transform).toBe(`translateX(-${VIEWPORT_WIDTH * 2}px)`);

    const indicators = screen.getAllByRole('presentation');
    expect(indicators[2]).toHaveClass('dot active');
  });

  test('transition is none while dragging and restored after touch end', () => {
    const { container } = render(<HappyStoryCarousel stories={mockStories} />);

    const viewport = container.querySelector(
      '.happy-story-viewport'
    ) as HTMLElement;
    const track = container.querySelector('.happy-story-track') as HTMLElement;
    expect(viewport).toBeTruthy();
    expect(track).toBeTruthy();

    fireEvent.touchStart(viewport, {
      touches: [{ clientX: 100 }],
    });
    expect(track.style.transition).toBe('none');

    fireEvent.touchEnd(viewport);
    expect(track.style.transition).toBe('transform 300ms ease');
  });
});
