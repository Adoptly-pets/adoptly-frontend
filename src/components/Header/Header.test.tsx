import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter, useLocation } from 'react-router-dom';

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location">{location.pathname + location.search}</div>;
};

jest.mock('../Icon/Icon', () => ({
  Icon: ({ id, size }: { id: string; size?: number }) => (
    <svg data-testid={`icon-${id}`} width={size} height={size} />
  ),
}));

jest.mock('../Navigation/Navigation', () => ({
  __esModule: true,
  default: () => <nav data-testid="navigation" />,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'uk', changeLanguage: jest.fn() },
  }),
}));
jest.mock('../../utils/routing', () => ({
  langLink: (path: string) => path,
}));

jest.mock('../GoogleAuthContainer/GoogleAuthContainer', () => ({
  __esModule: true,
  default: () => <div data-testid="google-auth-container" />,
}));

describe('Header Component', () => {
  test('renders the header with correct structure', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const navigation = screen.getByTestId('navigation');
    expect(navigation).toBeInTheDocument();

    const languageButton = screen.getByRole('button', {
      name: /switch language to ukrainian/i,
    });
    expect(languageButton).toBeInTheDocument();

    const favouriteButton = screen.getByTitle(/favourite/i);
    expect(favouriteButton).toBeInTheDocument();

    const userButton = screen.getByTitle(/username/i);
    expect(userButton).toBeInTheDocument();
  });

  test('preserves query string when switching language', () => {
    render(
      <MemoryRouter initialEntries={['/uk/reset-password?token=abc']}>
        <Header />
        <LocationDisplay />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole('button', { name: /switch language to ukrainian/i })
    );

    expect(screen.getByTestId('location')).toHaveTextContent(
      '/en/reset-password?token=abc'
    );
  });

  test('renders icons with correct attributes', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoIcon = screen.getByTestId('icon-icon-Logo');
    expect(logoIcon).toBeInTheDocument();

    const heartIcon = screen.getByTestId('icon-icon-heart');
    expect(heartIcon).toBeInTheDocument();
    expect(heartIcon).toHaveAttribute('width', '16');
    expect(heartIcon).toHaveAttribute('height', '16');

    const userIcon = screen.getByTestId('icon-icon-user');
    expect(userIcon).toBeInTheDocument();
    expect(userIcon).toHaveAttribute('width', '16');
    expect(userIcon).toHaveAttribute('height', '16');
  });
});
