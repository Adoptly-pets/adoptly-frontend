import { render, screen } from '@testing-library/react';
import HappyStorySection from './HappyStorySection';
import { HAPPY_STORIES_DATA } from '../../constants/HAPPY_STORIES_DATA';

jest.mock('../HappyStoryCarousel/HappyStoryCarousel', () => ({
  __esModule: true,
  default: ({ stories }: { stories: typeof HAPPY_STORIES_DATA }) => (
    <div data-testid="happy-story-carousel">
      {stories.map((story, index) => (
        <div key={index} data-testid="happy-story">
          <h3>{story.name}</h3>
          <img src={story.src} alt={story.name} />
        </div>
      ))}
    </div>
  ),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'happyStories.title': 'Щасливі історії',
      };
      return translations[key] || key;
    },
  }),
}));

describe('HappyStorySection Component', () => {
  test('renders the section with correct structure and content', () => {
    render(<HappyStorySection />);

    const section = screen.getByRole('region', { name: /щасливі історії/i });
    expect(section).toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: /щасливі історії/i });
    expect(heading).toBeInTheDocument();

    const carousel = screen.getByTestId('happy-story-carousel');
    expect(carousel).toBeInTheDocument();

    const stories = screen.getAllByTestId('happy-story');
    expect(stories).toHaveLength(HAPPY_STORIES_DATA.length);
  });

  test('renders each story with correct content', () => {
    render(<HappyStorySection />);

    HAPPY_STORIES_DATA.forEach(story => {
      expect(screen.getByText(story.name)).toBeInTheDocument();
      expect(screen.getByAltText(story.name)).toHaveAttribute('src', story.src);
    });
  });
});
