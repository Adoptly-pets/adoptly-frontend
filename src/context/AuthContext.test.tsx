import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { useAuth } from './useAuth';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ i18n: { language: 'uk' } }),
}));

const sampleUser = {
  id: 1,
  email: 'u@e.com',
  firstName: '',
  lastName: '',
  profileImageUrl: null,
  location: '',
  role: 'ROLE_USER' as const,
};

const Probe = () => {
  const { isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="status">
        {isAuthenticated ? 'authed' : 'guest'}
      </span>
      <button
        type="button"
        onClick={() =>
          login({ accessToken: 'at', refreshToken: 'rt' }, sampleUser)
        }
      >
        login
      </button>
      <button type="button" onClick={logout}>
        logout
      </button>
    </div>
  );
};

const renderProbe = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <Probe />
      </AuthProvider>
    </MemoryRouter>
  );

describe('AuthProvider reactivity', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('isAuthenticated flips to true after login without reload', () => {
    renderProbe();

    expect(screen.getByTestId('status').textContent).toBe('guest');

    fireEvent.click(screen.getByText('login'));

    expect(screen.getByTestId('status').textContent).toBe('authed');
  });

  test('isAuthenticated flips to false after logout without reload', () => {
    renderProbe();

    fireEvent.click(screen.getByText('login'));
    expect(screen.getByTestId('status').textContent).toBe('authed');

    fireEvent.click(screen.getByText('logout'));

    expect(screen.getByTestId('status').textContent).toBe('guest');
  });
});
