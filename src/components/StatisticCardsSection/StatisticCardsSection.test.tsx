import { render, screen } from '@testing-library/react';
import StatisticCardsSection from './StatisticCardsSection';
import type { NumberCardData } from '../../constants/NUMBER_CARD_DATA';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => `translated:${key}`,
  }),
}));

jest.mock(
  '../NumberCard/NumberCard',
  () => (props: { cardNumber: string; cardText: string }) => (
    <div data-testid="number-card">
      <span>{props.cardNumber}</span>
      <span>{props.cardText}</span>
    </div>
  )
);

describe('StatisticCardsSection', () => {
  const cards: NumberCardData[] = [
    { id: 1, cardNumber: '100', cardText: 'dogs' },
    { id: 2, cardNumber: '50', cardText: 'cats' },
  ];

  it('renders all NumberCard components with translated text', () => {
    render(<StatisticCardsSection cards={cards} />);
    const cardElements = screen.getAllByTestId('number-card');
    expect(cardElements).toHaveLength(2);

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('translated:dogs')).toBeInTheDocument();

    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('translated:cats')).toBeInTheDocument();
  });
});
