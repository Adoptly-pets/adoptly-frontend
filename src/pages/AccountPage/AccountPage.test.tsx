import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import AccountPage from './AccountPage';
import { AuthProvider } from '../../context/AuthContext';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'uk', changeLanguage: jest.fn() },
  }),
}));

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
};

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

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/uk/account']}>
      <AuthProvider>
        <AccountPage />
        <LocationDisplay />
      </AuthProvider>
    </MemoryRouter>
  );

describe('AccountPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('logout clears storage and redirects to home', () => {
    seedAuthenticated();
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: 'header.logout' }));

    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
    expect(localStorage.getItem('userInfo')).toBeNull();
    expect(screen.getByTestId('location').textContent).toBe('/uk/');
  });
});
