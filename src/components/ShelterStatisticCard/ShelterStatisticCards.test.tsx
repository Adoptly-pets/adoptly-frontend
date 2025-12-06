import { render, screen } from '@testing-library/react';
import ShelterStatisticCards from './ShelterStatisticCards';
import type { ShelterNumberCardData } from '../../constants/SHELTERS_NUMBER_CARD_DATA';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => `translated:${key}`,
  }),
}));

jest.mock(
  '../ShelterNumberCard/ShelterNumberCard',
  () => (props: { cardNumber: string; cardText: string }) => {
    return (
      <div data-testid="shelter-number-card">
        <span>{props.cardNumber ? props.cardNumber : '—'}</span>
        <span>{props.cardText}</span>
      </div>
    );
  }
);

describe('ShelterStatisticCards', () => {
  const cards: ShelterNumberCardData[] = [
    { id: 1, cardNumber: '10', cardText: 'dogs' },
    { id: 2, cardNumber: '', cardText: 'cats' },
  ];

  it('renders all ShelterNumberCard components with translated text', () => {
    render(<ShelterStatisticCards cards={cards} />);
    const cardElements = screen.getAllByTestId('shelter-number-card');
    expect(cardElements).toHaveLength(2);

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('translated:dogs')).toBeInTheDocument();

    expect(screen.getByText('—')).toBeInTheDocument();
    expect(screen.getByText('translated:cats')).toBeInTheDocument();
  });
});
