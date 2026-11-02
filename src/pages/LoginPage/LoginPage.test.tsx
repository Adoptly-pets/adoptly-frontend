import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import LoginPage from './LoginPage';
import { loginWithEmail } from '../../services/auth';
import { AuthProvider } from '../../context/AuthContext';

jest.mock('../../services/auth', () => ({
  loginWithEmail: jest.fn(),
  resendActivationEmail: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
  Trans: ({ i18nKey }: { i18nKey: string }) => <>{i18nKey}</>,
}));

const mockedLoginUser = loginWithEmail as jest.MockedFunction<
  typeof loginWithEmail
>;

jest.mock('../../components/Icon/Icon', () => ({
  Icon: ({ id, className }: { id: string; className?: string }) => (
    <svg data-testid={id} className={className} />
  ),
}));

jest.mock('../../components/GoogleAuthContainer/GoogleAuthContainer', () => ({
  __esModule: true,
  default: () => <div data-testid="google-auth-container" />,
}));

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
};

const renderPage = () => {
  return render(
    <MemoryRouter initialEntries={['/en/login']}>
      <AuthProvider>
        <LoginPage />
        <LocationDisplay />
      </AuthProvider>
    </MemoryRouter>
  );
};

const fillForm = (email: string, password: string) => {
  fireEvent.change(screen.getByPlaceholderText('login.email_placeholder'), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText('login.password_placeholder'), {
    target: { value: password },
  });
};

const makeLoginResponse = (role: 'ROLE_USER' | 'ROLE_SHELTER_OWNER') => ({
  accessToken: 'token',
  refreshToken: 'refresh',
  expiresIn: 86400000,
  userInfo: {
    id: 1,
    email: 'test@example.com',
    firstName: '',
    lastName: '',
    profileImageUrl: null,
    location: '',
    role,
  },
});

describe('LoginPage', () => {
  beforeEach(() => {
    localStorage.clear();
    mockedLoginUser.mockReset();
    mockedLoginUser.mockResolvedValue(makeLoginResponse('ROLE_USER'));
  });

  test('renders form with all fields', () => {
    renderPage();

    expect(
      screen.getByPlaceholderText('login.email_placeholder')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('login.password_placeholder')
    ).toBeInTheDocument();
    expect(screen.getByText('login.remember_me')).toBeInTheDocument();
    expect(screen.getByTestId('google-auth-container')).toBeInTheDocument();
  });

  test('shows validation errors on empty submit', async () => {
    renderPage();

    fireEvent.click(screen.getByText('login.submit'));

    await waitFor(() => {
      expect(screen.getByText('login.email_required')).toBeInTheDocument();
      expect(screen.getByText('login.password_required')).toBeInTheDocument();
    });
  });

  test('shows email format error for invalid email', async () => {
    renderPage();
    fillForm('invalid-email', 'password123');
    fireEvent.submit(screen.getByText('login.submit'));

    await waitFor(() => {
      expect(screen.getByText('login.email_invalid')).toBeInTheDocument();
    });
  });

  test('shows invalidCredentials inline error on 401', async () => {
    mockedLoginUser.mockRejectedValueOnce({
      type: 'client',
      status: 401,
      message: 'Bad credentials',
    });

    renderPage();
    fillForm('test@example.com', 'wrongpass');
    fireEvent.click(screen.getByText('login.submit'));

    await waitFor(() => {
      expect(screen.getByText('login.invalidCredentials')).toBeInTheDocument();
    });
  });

  test('opens EmailConfirmModal on 403', async () => {
    mockedLoginUser.mockRejectedValueOnce({
      type: 'client',
      status: 403,
      message: 'User is disabled',
    });

    renderPage();
    fillForm('inactive@example.com', 'password123');
    fireEvent.click(screen.getByText('login.submit'));

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'emailConfirm.title' })
      ).toBeInTheDocument();
    });
  });

  test('navigates to homepage after successful login as ROLE_USER', async () => {
    renderPage();
    fillForm('test@example.com', 'password123');
    fireEvent.click(screen.getByText('login.submit'));

    await waitFor(() => {
      expect(screen.getByTestId('location').textContent).toBe('/en/');
    });
  });

  test('saves tokens and userInfo to localStorage on success', async () => {
    renderPage();
    fillForm('test@example.com', 'password123');
    fireEvent.click(screen.getByText('login.submit'));

    await waitFor(() => {
      expect(localStorage.getItem('accessToken')).toBe('token');
    });
    expect(localStorage.getItem('refreshToken')).toBe('refresh');
    expect(JSON.parse(localStorage.getItem('userInfo')!)).toMatchObject({
      email: 'test@example.com',
      role: 'ROLE_USER',
    });
  });

  test('navigates to shelter profile for ROLE_SHELTER_OWNER', async () => {
    mockedLoginUser.mockResolvedValueOnce(
      makeLoginResponse('ROLE_SHELTER_OWNER')
    );

    renderPage();
    fillForm('owner@example.com', 'password123');
    fireEvent.click(screen.getByText('login.submit'));

    await waitFor(() => {
      expect(screen.getByTestId('location').textContent).toBe(
        '/en/shelter/profile'
      );
    });
  });

  test('Forgot password link points to forgot-password page', () => {
    renderPage();

    const link = screen.getByRole('link', { name: 'login.forgot_password' });
    expect(link).toHaveAttribute('href', '/en/forgot-password');
  });
});
