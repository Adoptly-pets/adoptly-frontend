import { render, screen } from '@testing-library/react';
import SheltersHero from './SheltersHero';

type Card = { cardNumber?: string; cardText: string };

jest.mock('../Icon/Icon', () => ({
  Icon: (props: {
    id: string;
    className?: string;
    size?: number | string;
    height?: number | string;
  }) => <span data-testid="icon-mock" {...props} />,
}));

jest.mock(
  '../ShelterStatisticCard/ShelterStatisticCards',
  () => (props: { cards: Card[] }) => (
    <div data-testid="stat-cards-mock">{props.cards ? 'Cards' : ''}</div>
  )
);

jest.mock('i18next', () => ({
  t: (key: string) => key,
}));

jest.mock('../../constants/SHELTERS_NUMBER_CARD_DATA', () => ({
  SHELTERS_NUMBER_CARD_DATA: [{ cardNumber: '1', cardText: 'Test Card' }],
}));

describe('SheltersHero', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('renders logo, paragraph, statistic cards and image (desktop)', () => {
    render(<SheltersHero />);
    expect(screen.getByTestId('icon-mock')).toBeInTheDocument();
    expect(screen.getByText('sheltersHero.paragraph')).toBeInTheDocument();
    expect(screen.getByTestId('stat-cards-mock')).toBeInTheDocument();
    expect(screen.getByAltText('pets')).toBeInTheDocument();
  });

  it('renders statistic cards below image on mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    render(<SheltersHero />);
    expect(screen.getByTestId('stat-cards-mock')).toBeInTheDocument();
    expect(screen.getByAltText('pets')).toBeInTheDocument();
  });
});
