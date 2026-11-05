import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import ShelterLogoutButton from './ShelterLogoutButton';
import { AuthProvider } from '../../../context/AuthContext';

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
      email: 'shelter@e.com',
      firstName: '',
      lastName: '',
      profileImageUrl: null,
      location: '',
      role: 'ROLE_SHELTER_OWNER',
    })
  );
};

describe('ShelterLogoutButton', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('logout clears storage and redirects to home', () => {
    seedAuthenticated();
    render(
      <MemoryRouter initialEntries={['/uk/shelter/profile']}>
        <AuthProvider>
          <ShelterLogoutButton />
          <LocationDisplay />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'shelter.menu.logout' })
    );

    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
    expect(localStorage.getItem('userInfo')).toBeNull();
    expect(screen.getByTestId('location').textContent).toBe('/uk/');
  });
});
