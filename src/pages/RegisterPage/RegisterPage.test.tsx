import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import { registerWithEmail } from '../../services/auth';

jest.mock('../../services/auth', () => ({
  registerWithEmail: jest.fn(),
  resendActivationEmail: jest.fn(),
}));

const mockedRegister = registerWithEmail as jest.MockedFunction<
  typeof registerWithEmail
>;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
  Trans: ({ i18nKey }: { i18nKey: string }) => <>{i18nKey}</>,
}));

jest.mock('../../components/Icon/Icon', () => ({
  Icon: ({ id }: { id: string }) => <svg data-testid={id} />,
}));

jest.mock('../../components/GoogleAuthContainer/GoogleAuthContainer', () => ({
  __esModule: true,
  default: () => <div data-testid="google-auth-container" />,
}));

jest.mock('../../components/PasswordStrengthBar/PasswordStrengthBar', () => {
  const MockPasswordStrengthBar = ({ password }: { password: string }) => (
    <div data-testid="password-strength-bar" data-password={password} />
  );
  MockPasswordStrengthBar.displayName = 'MockPasswordStrengthBar';
  return { __esModule: true, default: MockPasswordStrengthBar };
});

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/en/register']}>
      <RegisterPage />
    </MemoryRouter>
  );

const fillForm = (email: string, password: string, role = 'adopter') => {
  fireEvent.click(screen.getByText(`registration.role_${role}`));
  fireEvent.change(
    screen.getByPlaceholderText('registration.email_placeholder'),
    { target: { value: email } }
  );
  fireEvent.change(
    screen.getByPlaceholderText('registration.password_placeholder'),
    { target: { value: password } }
  );
};

describe('RegisterPage', () => {
  beforeEach(() => {
    mockedRegister.mockReset();
    mockedRegister.mockResolvedValue({
      data: { accessToken: null },
    } as Awaited<ReturnType<typeof registerWithEmail>>);
  });

  test('renders form with all fields and Google button', () => {
    renderPage();

    expect(screen.getByText('registration.role_adopter')).toBeInTheDocument();
    expect(screen.getByText('registration.role_shelter')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('registration.email_placeholder')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('registration.password_placeholder')
    ).toBeInTheDocument();
    expect(screen.getByTestId('google-auth-container')).toBeInTheDocument();
  });

  test('shows validation errors on empty submit', async () => {
    renderPage();

    fireEvent.click(screen.getByText('registration.submit'));

    await waitFor(() => {
      expect(
        screen.getByText('registration.role_required')
      ).toBeInTheDocument();
      expect(
        screen.getByText('registration.email_required')
      ).toBeInTheDocument();
      expect(
        screen.getByText('registration.password_required')
      ).toBeInTheDocument();
    });
  });

  test('shows email format error for invalid email', async () => {
    renderPage();
    fillForm('invalid-email', 'password123');
    fireEvent.submit(screen.getByText('registration.submit'));

    await waitFor(() => {
      expect(
        screen.getByText('registration.email_invalid')
      ).toBeInTheDocument();
    });
  });

  test('switches to confirm state after successful submit', async () => {
    renderPage();
    fillForm('new@example.com', 'password123');
    fireEvent.click(screen.getByText('registration.submit'));

    await waitFor(() => {
      expect(mockedRegister).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'password123',
        role: 'adopter',
      });
    });

    expect(screen.getByText('emailConfirm.title')).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('registration.email_placeholder')
    ).not.toBeInTheDocument();
  });

  test('shows emailInUse error on 409', async () => {
    mockedRegister.mockRejectedValueOnce({
      type: 'client',
      status: 409,
      message: 'Email already in use',
    });

    renderPage();
    fillForm('taken@example.com', 'password123');
    fireEvent.click(screen.getByText('registration.submit'));

    await waitFor(() => {
      expect(screen.getByText('registration.emailInUse')).toBeInTheDocument();
    });

    expect(screen.queryByText('emailConfirm.title')).not.toBeInTheDocument();
  });

  test('shows inline serverError on 500', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockedRegister.mockRejectedValueOnce({
      type: 'server',
      status: 500,
      message: 'Server error',
    });

    renderPage();
    fillForm('new@example.com', 'password123');
    fireEvent.click(screen.getByText('registration.submit'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('errors.serverError');
    });

    consoleErrorSpy.mockRestore();
  });

  test('Login link points to login page', () => {
    renderPage();

    const link = screen.getByRole('link', { name: 'registration.login_link' });
    expect(link).toHaveAttribute('href', '/en/login');
  });
});
