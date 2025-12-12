import { render, screen } from '@testing-library/react';
import HeroAboutUs from './HeroAboutUs';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'heroAboutUs.paragraph':
          'Cервіс, де кожен охочий може знайти свого улюбленця з усіх притулків України.',
        'heroAboutUs.button': 'Почати пошук улюбленця',
        'heroAboutUs.mobileButton': 'Пошук',
      };
      return translations[key] || key;
    },
    i18n: {
      language: 'uk',
    },
  }),
}));

describe('HeroAboutUs', () => {
  it('renders the title', () => {
    render(<HeroAboutUs />);
    expect(screen.getByText('Adoptly')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<HeroAboutUs />);
    expect(
      screen.getByText(/кожен охочий може знайти свого улюбленця/i)
    ).toBeInTheDocument();
  });

  it('renders desktop button text', () => {
    render(<HeroAboutUs />);

    expect(screen.getByText(/пошук улюбленця/i)).toBeInTheDocument();
  });

  it('section has correct class', () => {
    render(<HeroAboutUs />);
    const section = screen.getByRole('region');
    expect(section).toHaveClass('hero-background');
  });
});
