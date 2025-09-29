/* eslint-disable no-import-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import HowItWorks from './HowItWorks';
import { GUIDE_CARD_DATA as _GUIDE_CARD_DATA } from '../../constants/GUIDE_CARD_DATA';
import GuideCard from '../GuideCard/GuideCard';

jest.mock('../GuideCard/GuideCard', () => {
  const mockGuideCard = jest.fn(
    ({ cardImgSrc, cardImgAlt, cardNumber, cardStep, cardDescription }) => {
      if (!cardDescription.length) {
        return null;
      }
      return (
        <div data-testid={`guide-card-${cardNumber}`}>
          <img
            src={cardImgSrc}
            alt={cardImgAlt || 'Guide card image'}
            loading="lazy"
            decoding="async"
          />
          <h3>{cardNumber}</h3>
          <h4>{cardStep}</h4>
          <p>
            {cardDescription.map(
              (part: { text: string; bold: boolean }, index: number) =>
                part.bold ? <strong key={index}>{part.text}</strong> : part.text
            )}
          </p>
        </div>
      );
    }
  );
  return mockGuideCard;
});

jest.mock(
  '../../assets/images/animal_tracks.webp',
  () => 'mocked-animal-tracks.webp',
  { virtual: true }
);

jest.mock(
  '../assets/images/guideCardImg1.webp',
  () => 'mocked-guideCardImg1.webp',
  { virtual: true }
);
jest.mock(
  '../assets/images/guideCardImg2.webp',
  () => 'mocked-guideCardImg2.webp',
  { virtual: true }
);
jest.mock(
  '../assets/images/guideCardImg3.webp',
  () => 'mocked-guideCardImg3.webp',
  { virtual: true }
);
jest.mock(
  '../assets/images/guideCardImg4.webp',
  () => 'mocked-guideCardImg4.webp',
  { virtual: true }
);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'howItWorks.title': 'Як це працює',
        'howItWorks.subtitle': 'Покрокова інструкція',
        'howItWorks.noData': 'Немає даних для відображення',
      };
      return translations[key] || key;
    },
  }),
}));

describe('HowItWorks Component', () => {
  const mockGuideCardData = [
    {
      cardImgSrc: 'mocked-guideCardImg1.webp',
      cardImgAlt: 'Силует собаки та кота, що сидять поруч, символ гармонії.',
      cardNumber: '01',
      cardStep: 'Обери кого шукаєш',
      cardDescription: [
        { text: 'Налаштовуй фільтри —', bold: true },
        { text: ' вкажи вид тварини, стать, вік, розмір.', bold: false },
      ],
    },
    {
      cardImgSrc: 'mocked-guideCardImg2.webp',
      cardImgAlt: 'Людина тримає смартфон із профілем у соцмережі.',
      cardNumber: '02',
      cardStep: 'Свайпай картки',
      cardDescription: [
        { text: 'Переглядай профілі', bold: true },
        { text: ' тварин та обирай улюбленця.', bold: false },
      ],
    },
    {
      cardImgSrc: 'mocked-guideCardImg3.webp',
      cardImgAlt: 'Рука людини та лапа тварини торкаються, символ дружби.',
      cardNumber: '03',
      cardStep: 'Отримай match',
      cardDescription: [
        { text: 'Та переходь до заповнення ', bold: false },
        { text: 'коротенької анкети.', bold: true },
      ],
    },
    {
      cardImgSrc: 'mocked-guideCardImg4.webp',
      cardImgAlt: 'Людина обіймає собаку, символ тепла та любові.',
      cardNumber: '04',
      cardStep: 'Забирай хвостика додому',
      cardDescription: [
        { text: 'Відчуй щастя,', bold: true },
        { text: ' що торкається лапкою. Радість та новий ритм.', bold: false },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (_GUIDE_CARD_DATA as any) = mockGuideCardData;
  });

  test('renders the section with correct accessibility attributes', () => {
    render(<HowItWorks />);

    const section = screen.getByTestId('how-it-works-section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('role', 'region');
    expect(section).toHaveAttribute('aria-labelledby', 'how-it-works-title');
  });

  test('renders header content correctly when GUIDE_CARD_DATA is not empty', () => {
    render(<HowItWorks />);

    expect(screen.getByText('Як це працює')).toBeInTheDocument();
    expect(screen.getByText('Покрокова інструкція')).toBeInTheDocument();
    const image = screen.getByAltText(
      'Animal tracks illustration for step-by-step guide'
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mocked-animal-tracks.webp');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  test('renders GuideCard components when GUIDE_CARD_DATA is not empty', () => {
    render(<HowItWorks />);

    expect(GuideCard).toHaveBeenCalledTimes(mockGuideCardData.length);
    expect(screen.getByTestId('guide-card-01')).toBeInTheDocument();
    expect(screen.getByTestId('guide-card-02')).toBeInTheDocument();
    expect(screen.getByTestId('guide-card-03')).toBeInTheDocument();
    expect(screen.getByTestId('guide-card-04')).toBeInTheDocument();

    mockGuideCardData.forEach((data, index) => {
      expect(GuideCard).toHaveBeenNthCalledWith(
        index + 1,
        {
          cardImgSrc: data.cardImgSrc,
          cardImgAlt: data.cardImgAlt,
          cardNumber: data.cardNumber,
          cardStep: data.cardStep,
          cardDescription: data.cardDescription,
        },
        undefined
      );
    });
  });

  test('renders fallback message when GUIDE_CARD_DATA is empty', () => {
    (_GUIDE_CARD_DATA as any) = [];

    render(<HowItWorks />);

    expect(
      screen.getByText('Немає даних для відображення')
    ).toBeInTheDocument();
    expect(screen.queryByText('Як це працює')).not.toBeInTheDocument();
    expect(screen.queryByText('Покрокова інструкція')).not.toBeInTheDocument();
    expect(GuideCard).not.toHaveBeenCalled();
  });

  test('does not render GuideCard when cardDescription is empty', () => {
    (_GUIDE_CARD_DATA as any) = [
      {
        cardImgSrc: 'mocked-guideCardImg1.webp',
        cardImgAlt: 'Силует собаки та кота, що сидять поруч, символ гармонії.',
        cardNumber: '01',
        cardStep: 'Обери кого шукаєш',
        cardDescription: [],
      },
    ];

    render(<HowItWorks />);

    expect(GuideCard).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('guide-card-01')).not.toBeInTheDocument();
  });
});
