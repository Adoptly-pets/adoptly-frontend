import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';

const LocationDisplay = () => {
  const location = useLocation();
  return (
    <div data-testid="location">
      {location.pathname + location.search + location.hash}
    </div>
  );
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

const seedAuthenticated = () => {
  localStorage.setItem('accessToken', 'token');
  localStorage.setItem('refreshToken', 'refresh');
  localStorage.setItem(
    'userInfo',
    JSON.stringify({
      id: 1,
      email: 'u@e.com',
      firstName: '',
      lastName: '',
      profileImageUrl: null,
      location: '',
      role: 'ROLE_USER',
    })
  );
};

const renderHeader = (initialEntries: string[] = ['/']) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        <Header />
        <LocationDisplay />
      </AuthProvider>
    </MemoryRouter>
  );

describe('Header Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders the header with correct structure', () => {
    renderHeader();

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const navigation = screen.getByTestId('navigation');
    expect(navigation).toBeInTheDocument();

    const languageButton = screen.getByRole('button', {
      name: /switch language to english/i,
    });
    expect(languageButton).toBeInTheDocument();

    const favouriteButton = screen.getByTitle(/favourite/i);
    expect(favouriteButton).toBeInTheDocument();

    const loginLink = screen.getByTitle('header.login');
    expect(loginLink).toBeInTheDocument();
  });

  test('preserves query string and hash when switching language', () => {
    renderHeader(['/uk/reset-password?token=abc#section']);

    fireEvent.click(
      screen.getByRole('button', { name: /switch language to english/i })
    );

    expect(screen.getByTestId('location')).toHaveTextContent(
      '/en/reset-password?token=abc#section'
    );
  });

  test('renders icons with correct attributes', () => {
    renderHeader();

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

  test('shows login link when guest', () => {
    renderHeader();

    const link = screen.getByRole('link', { name: 'header.login' });
    expect(link).toHaveAttribute('href', '/login');
    expect(
      screen.queryByRole('button', { name: 'header.logout' })
    ).not.toBeInTheDocument();
  });

  test('logs out, clears storage, and redirects to home when authenticated', () => {
    seedAuthenticated();
    renderHeader(['/uk/pets']);

    fireEvent.click(screen.getByRole('button', { name: 'header.logout' }));

    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
    expect(localStorage.getItem('userInfo')).toBeNull();
    expect(screen.getByTestId('location')).toHaveTextContent('/uk/');
    expect(
      screen.queryByRole('button', { name: 'header.logout' })
    ).not.toBeInTheDocument();
    expect(screen.getByTitle('header.login')).toBeInTheDocument();
  });
});
