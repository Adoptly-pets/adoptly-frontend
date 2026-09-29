import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ResetPasswordPage from './ResetPasswordPage';
import { resetPassword } from '../../services/auth';

jest.mock('../../services/auth', () => ({
  resetPassword: jest.fn(),
}));

const mockedReset = resetPassword as jest.MockedFunction<typeof resetPassword>;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

jest.mock('../../components/Icon/Icon', () => ({
  Icon: ({ id }: { id: string }) => <svg data-testid={id} />,
}));

jest.mock('../../components/PasswordStrengthBar/PasswordStrengthBar', () => {
  const MockPasswordStrengthBar = ({ password }: { password: string }) => (
    <div data-testid="password-strength-bar" data-password={password} />
  );
  MockPasswordStrengthBar.displayName = 'MockPasswordStrengthBar';
  return { __esModule: true, default: MockPasswordStrengthBar };
});

const renderPage = (search = '?token=abc') => {
  return render(
    <MemoryRouter initialEntries={[`/en/reset-password${search}`]}>
      <ResetPasswordPage />
    </MemoryRouter>
  );
};

const fillForm = async (
  newPassword: string,
  confirmPassword: string = newPassword
) => {
  const user = userEvent.setup();
  const [newInput, confirmInput] = screen.getAllByPlaceholderText(
    'resetPassword.passwordPlaceholder'
  );
  await user.type(newInput, newPassword);
  await user.type(confirmInput, confirmPassword);
  await user.click(screen.getByRole('button', { name: /submitButton/i }));
};

describe('ResetPasswordPage', () => {
  beforeEach(() => {
    mockedReset.mockReset();
  });

  test('renders form when token is present in URL', () => {
    renderPage('?token=abc');
    expect(
      screen.getAllByPlaceholderText('resetPassword.passwordPlaceholder')
    ).toHaveLength(2);
    expect(
      screen.queryByText('resetPassword.tokenErrorMessage')
    ).not.toBeInTheDocument();
  });

  test('renders tokenError state when token is missing from URL', () => {
    renderPage('');
    expect(
      screen.getByText('resetPassword.tokenErrorMessage')
    ).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('resetPassword.passwordPlaceholder')
    ).not.toBeInTheDocument();
  });

  test('shows minLength error for password shorter than 8 characters', async () => {
    renderPage();
    await fillForm('short');

    // Text appears twice: once in the always-visible hint, once as the
    // validation error under the field. Before submit only the hint is
    // present; after a failed submit the error span is added, giving 2.
    await waitFor(() => {
      expect(
        screen.getAllByText('resetPassword.passwordMinLength')
      ).toHaveLength(2);
    });
    expect(mockedReset).not.toHaveBeenCalled();
  });

  test('shows mismatch error when confirmPassword differs from newPassword', async () => {
    renderPage();
    await fillForm('validPass123', 'differentPass');

    expect(
      await screen.findByText('resetPassword.passwordsMustMatch')
    ).toBeInTheDocument();
    expect(mockedReset).not.toHaveBeenCalled();
  });

  test('calls resetPassword with token and password on valid submit', async () => {
    mockedReset.mockResolvedValue(undefined);
    renderPage('?token=abc123');
    await fillForm('validPass123');

    await waitFor(() => {
      expect(mockedReset).toHaveBeenCalledWith({
        token: 'abc123',
        newPassword: 'validPass123',
      });
    });
  });

  test('shows success state and back-to-login link after successful submit', async () => {
    mockedReset.mockResolvedValue(undefined);
    renderPage('?token=abc');
    await fillForm('validPass123');

    expect(
      await screen.findByText('resetPassword.successMessage')
    ).toBeInTheDocument();
    const backLink = screen.getByRole('link', {
      name: 'resetPassword.backToLogin',
    });
    expect(backLink).toHaveAttribute('href', '/en/');
  });

  test('switches to tokenError state on 401 response', async () => {
    mockedReset.mockRejectedValueOnce({
      type: 'client',
      status: 401,
      message: 'Invalid token',
    });
    renderPage();
    await fillForm('validPass123');

    expect(
      await screen.findByText('resetPassword.tokenErrorMessage')
    ).toBeInTheDocument();
  });

  test('shows inline serverError on non-401 failure', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockedReset.mockRejectedValueOnce({
      type: 'server',
      status: 500,
      message: 'Server error',
    });
    renderPage();
    await fillForm('validPass123');

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('errors.serverError');
    expect(
      screen.queryByText('resetPassword.tokenErrorMessage')
    ).not.toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
