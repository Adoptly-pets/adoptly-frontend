import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

jest.mock('../Icon/Icon', () => ({
  Icon: ({
    id,
    className,
    size,
  }: {
    id: string;
    className?: string;
    size?: number;
  }) => (
    <svg
      data-testid={`icon-${id}`}
      className={className}
      width={size}
      height={size}
    />
  ),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'footer.platform': 'Платформа для адопції тварин',
        'footer.findPet': 'Знайти улюбленця',
        'footer.joinShelter': 'Доєднатись як притулок',
        'footer.donate': 'Задонатити',
        'footer.volunteer': 'Волонтерство',
        'footer.helpMedicalFood': 'Допомогти ліками / кормом',
      };
      return translations[key] || key;
    },
  }),
}));

describe('Footer Component', () => {
  const mockScrollIntoView = jest.fn();

  beforeEach(() => {
    jest.spyOn(document, 'getElementById').mockReturnValue({
      scrollIntoView: mockScrollIntoView,
    } as unknown as HTMLElement);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('renders footer with correct structure and content', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
    expect(screen.getByTestId('icon-icon-Logo')).toHaveClass('footer-logo');
    expect(
      screen.getByRole('link', { name: /Cookie policy/i })
    ).toBeInTheDocument(); //add this one

    expect(
      screen.getByRole('link', { name: /Back to top/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('separator')).toHaveClass('divider'); // hr
  });

  //add this one
  test('renders main platform link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const platformLink = screen.getByRole('link', {
      name: /Платформа для адопції тварин/i,
    });
    expect(platformLink).toHaveAttribute('href', '/');
    expect(platformLink).toHaveClass('platform-footer');
  });

  test('renders navigation links with correct hrefs', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('link', { name: /Знайти улюбленця/i })
    ).toHaveAttribute('href', '/find-pet');
    expect(
      screen.getByRole('link', { name: /Доєднатись як притулок/i })
    ).toHaveAttribute('href', '/shelters');
    expect(screen.getByRole('link', { name: /Задонатити/i })).toHaveAttribute(
      'href',
      '/donate'
    );
    expect(screen.getByRole('link', { name: /Волонтерство/i })).toHaveAttribute(
      'href',
      '/volunteer'
    );
    expect(
      screen.getByRole('link', { name: /Допомогти ліками \/ кормом/i })
    ).toHaveAttribute('href', '/help-medical-food');
  });

  test('renders social media links with correct attributes', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const instagramLink = screen.getByRole('link', { name: /Instagram/i });
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com');
    expect(instagramLink).toHaveAttribute('target', '_blank');
    expect(screen.getByTestId('icon-icon-instagram')).toHaveAttribute(
      'width',
      '25'
    );

    const facebookLink = screen.getByRole('link', { name: /Facebook/i });
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com');
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(screen.getByTestId('icon-icon-facebook')).toHaveAttribute(
      'width',
      '25'
    );

    const tiktokLink = screen.getByRole('link', { name: /TikTok/i });
    expect(tiktokLink).toHaveAttribute('href', 'https://www.tiktok.com');
    expect(tiktokLink).toHaveAttribute('target', '_blank');
    expect(screen.getByTestId('icon-icon-tiktok')).toHaveAttribute(
      'width',
      '25'
    );
  });

  test('calls scrollToHeader when back to top link is clicked', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const backToTopLink = screen.getByRole('link', { name: /Back to top/i });
    fireEvent.click(backToTopLink);

    expect(document.getElementById).toHaveBeenCalledWith('header');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  test('does not call scrollIntoView if header element is not found', () => {
    jest.spyOn(document, 'getElementById').mockReturnValueOnce(null); // Мокаємо повернення null
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const backToTopLink = screen.getByRole('link', { name: /Back to top/i });
    fireEvent.click(backToTopLink);

    expect(document.getElementById).toHaveBeenCalledWith('header');
    expect(mockScrollIntoView).not.toHaveBeenCalled(); // Перевіряємо, що scrollIntoView не викликано
  });
});
