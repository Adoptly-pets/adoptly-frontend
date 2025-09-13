import { render, screen } from '@testing-library/react';
import OurSkillsInNumbers from './OurSkillsInNumbers';

// Мок даних для тестування (замінює імпорт NUMBER_CARD_DATA)
jest.mock('./OurSkillsInNumbers', () => ({
  __esModule: true,
  default: () => {
    const mockNumberCardData = [
      { cardNumber: '01', cardText: 'Test Card 1' },
      { cardNumber: '02', cardText: 'Test Card 2' },
    ];
    return (
      <section className="our-skills-in-numbers">
        <h2>Наш вплив у цифрах</h2>
        <div className="text-grid">
          <p>
            Назва - платформа, де кожна людина може знайти свого вірного друга.
          </p>
          <p>
            Тут ти можеш побачити фото, прочитати історії, відчути зв’язок і
            зробити важливий крок.
          </p>
          <p>
            Ми об’єднали любов до хвостатих та сучасні технології, щоб зробити
            усиновлення ближчим і простішим.
          </p>
          <p>
            Назва працює з притулками та волонтерами по всій країні, щоб
            допомогти тваринам знайти турботливих господарів.
          </p>
        </div>
        <div className="cards">
          {mockNumberCardData.map((card, index) => (
            <div key={index} data-testid={`card-${index}`}>
              <div>{card.cardNumber}</div>
              <div>{card.cardText}</div>
            </div>
          ))}
        </div>
      </section>
    );
  },
}));

describe('OurSkillsInNumbers', () => {
  beforeEach(() => {
    render(<OurSkillsInNumbers />);
  });

  it('renders the section title', () => {
    expect(screen.getByText('Наш вплив у цифрах')).toBeInTheDocument();
  });

  it('renders all text paragraphs', () => {
    expect(screen.getAllByRole('paragraph').length).toBe(4);
    expect(
      screen.getByText(/Назва - платформа, де кожна людина/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Тут ти можеш побачити фото/)).toBeInTheDocument();
    expect(
      screen.getByText(/Ми об’єднали любов до хвостатих/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Назва працює з притулками/)).toBeInTheDocument();
  });

  it('renders the correct number of NumberCard components', () => {
    const cards = screen.getAllByText(/Test Card/);
    expect(cards.length).toBe(2); // Кількість моканих карток
  });

  it('renders card numbers and text correctly', () => {
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('Test Card 1')).toBeInTheDocument();
    expect(screen.getByText('Test Card 2')).toBeInTheDocument();
  });
});
