import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GuideCardCarousel from './GuideCardCarousel';
import GuideCard from '../GuideCard/GuideCard';

// Define GuideCardData interface to match GuideCardCarousel.tsx
interface GuideCardData {
  cardImgSrc: string;
  cardImgAlt: string;
  cardNumber: string;
  cardStep: string;
  cardDescription: { text: string; bold: boolean }[];
}

// Mock GuideCard component with proper typing
jest.mock('../GuideCard/GuideCard', () => {
  return jest.fn(
    ({
      cardImgSrc,
      cardImgAlt,
      cardNumber,
      cardStep,
      cardDescription,
    }: GuideCardData) => (
      <div data-testid="guide-card">
        <img src={cardImgSrc} alt={cardImgAlt} />
        <h3>{cardNumber}</h3>
        <h4>{cardStep}</h4>
        <p>
          {cardDescription
            .map((desc: { text: string; bold: boolean }) => desc.text)
            .join(' ')}
        </p>
      </div>
    )
  );
});

const mockCards: GuideCardData[] = [
  {
    cardImgSrc: '/images/card1.webp',
    cardImgAlt: 'Card 1',
    cardNumber: '01',
    cardStep: 'Step 1',
    cardDescription: [{ text: 'Description 1', bold: false }],
  },
  {
    cardImgSrc: '/images/card2.webp',
    cardImgAlt: 'Card 2',
    cardNumber: '02',
    cardStep: 'Step 2',
    cardDescription: [{ text: 'Description 2', bold: false }],
  },
  {
    cardImgSrc: '/images/card3.webp',
    cardImgAlt: 'Card 3',
    cardNumber: '03',
    cardStep: 'Step 3',
    cardDescription: [{ text: 'Description 3', bold: false }],
  },
];

describe('GuideCardCarousel', () => {
  beforeEach(() => {
    (GuideCard as jest.Mock).mockClear();
  });

  test('renders empty state when no cards are provided', () => {
    render(<GuideCardCarousel cards={[]} />);
    expect(
      screen.getByText('Немає даних для відображення')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('guide-card')).not.toBeInTheDocument();
  });

  test('renders all cards in the DOM', () => {
    render(<GuideCardCarousel cards={mockCards} />);
    const slides = screen.getAllByTestId('guide-card');
    expect(slides).toHaveLength(mockCards.length);
  });

  test('renders the first card and dots correctly', () => {
    render(<GuideCardCarousel cards={mockCards} />);
    const cards = screen.getAllByTestId('guide-card');
    expect(cards).toHaveLength(mockCards.length);
    expect(cards[0]).toBeInTheDocument();

    const dots = screen.getAllByRole('button', { name: /Перейти до картки/ });
    expect(dots).toHaveLength(3);
    expect(dots[0]).toHaveClass('carousel-dot active');
    expect(dots[1]).toHaveClass('carousel-dot');
    expect(dots[2]).toHaveClass('carousel-dot');
  });

  test('navigates to next card on button click', async () => {
    render(<GuideCardCarousel cards={mockCards} />);
    const nextButton = screen.getByRole('button', { name: 'Наступна картка' });
    await userEvent.click(nextButton);
    const dots = screen.getAllByRole('button', { name: /Перейти до картки/ });
    expect(dots[1]).toHaveClass('carousel-dot active');
  });

  test('navigates to previous card on button click', async () => {
    render(<GuideCardCarousel cards={mockCards} />);
    const prevButton = screen.getByRole('button', { name: 'Попередня картка' });
    await userEvent.click(prevButton);
    const dots = screen.getAllByRole('button', { name: /Перейти до картки/ });
    expect(dots[2]).toHaveClass('carousel-dot active');
  });

  test('navigates to specific card on dot click', async () => {
    render(<GuideCardCarousel cards={mockCards} />);
    const dots = screen.getAllByRole('button', { name: /Перейти до картки/ });
    await userEvent.click(dots[2]);
    expect(dots[2]).toHaveClass('carousel-dot active');
  });

  test('swipes left to navigate to next card', async () => {
    render(<GuideCardCarousel cards={mockCards} />);
    const slideContainer = screen
      .getByRole('region', {
        name: 'Guide card carousel',
      })
      .querySelector('.slide-container');

    // Свайп вліво
    fireEvent.touchStart(slideContainer!, { touches: [{ clientX: 200 }] });
    fireEvent.touchMove(slideContainer!, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(slideContainer!);

    const dots = screen.getAllByRole('button', { name: /Перейти до картки/ });
    expect(dots[1]).toHaveClass('carousel-dot active');
  });

  test('swipes right to navigate to previous card', async () => {
    render(<GuideCardCarousel cards={mockCards} />);
    const slideContainer = screen
      .getByRole('region', {
        name: 'Guide card carousel',
      })
      .querySelector('.slide-container');

    // Перейти до другої картки
    const dots = screen.getAllByRole('button', { name: /Перейти до картки/ });
    await userEvent.click(dots[1]);

    // Свайп вправо
    fireEvent.touchStart(slideContainer!, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(slideContainer!, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(slideContainer!);

    expect(dots[0]).toHaveClass('carousel-dot active');
  });

  test('does not navigate if swipe distance is too small', async () => {
    render(<GuideCardCarousel cards={mockCards} />);
    const slidesContainer = screen.getByRole('region', {
      name: 'Guide card carousel',
    });

    fireEvent.touchStart(slidesContainer, { touches: [{ clientX: 200 }] });
    fireEvent.touchMove(slidesContainer, { touches: [{ clientX: 180 }] }); // Less than 50px
    fireEvent.touchEnd(slidesContainer);

    const dots = screen.getAllByRole('button', { name: /Перейти до картки/ });
    expect(dots[0]).toHaveClass('carousel-dot active');
  });

  test('does not swipe prev on first card or next on last card', async () => {
    render(<GuideCardCarousel cards={mockCards} />);
    const slidesContainer = screen.getByRole('region', {
      name: 'Guide card carousel',
    });

    // Свайп вправо на першій картці
    fireEvent.touchStart(slidesContainer, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(slidesContainer, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(slidesContainer);

    const dots = screen.getAllByRole('button', { name: /Перейти до картки/ });
    expect(dots[0]).toHaveClass('carousel-dot active');

    // Перейти до останньої картки
    await userEvent.click(dots[2]);

    // Свайп вліво на останній картці
    fireEvent.touchStart(slidesContainer, { touches: [{ clientX: 200 }] });
    fireEvent.touchMove(slidesContainer, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(slidesContainer);

    expect(dots[2]).toHaveClass('carousel-dot active');
  });

  test('has correct accessibility attributes', () => {
    render(<GuideCardCarousel cards={mockCards} />);
    const carousel = screen.getByRole('region', {
      name: 'Guide card carousel',
    });
    expect(carousel).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Попередня картка' })
    ).toHaveAttribute('aria-label', 'Попередня картка');
    expect(
      screen.getByRole('button', { name: 'Наступна картка' })
    ).toHaveAttribute('aria-label', 'Наступна картка');
    const dots = screen.getAllByRole('button', { name: /Перейти до картки/ });
    dots.forEach((dot, index) => {
      expect(dot).toHaveAttribute(
        'aria-label',
        `Перейти до картки ${index + 1}`
      );
      expect(dot).toHaveAttribute('tabindex', '0');
    });
  });
});
