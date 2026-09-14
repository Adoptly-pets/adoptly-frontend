import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginModal from './LoginModal';
import { loginWithEmail } from '../../services/auth';

jest.mock('../../services/auth', () => ({
  loginWithEmail: jest.fn(),
  resendActivationEmail: jest.fn(),
}));

const mockedLoginUser = loginWithEmail as jest.MockedFunction<
  typeof loginWithEmail
>;

jest.mock('../Icon/Icon', () => ({
  Icon: ({ id, className }: { id: string; className?: string }) => (
    <svg data-testid={id} className={className} />
  ),
}));

jest.mock('../GoogleAuthContainer/GoogleAuthContainer', () => ({
  __esModule: true,
  default: () => <div data-testid="google-auth-container" />,
}));

describe('LoginModal', () => {
  const onClose = jest.fn();
  const onSwitchToRegister = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    onSwitchToRegister.mockClear();
    mockedLoginUser.mockReset();
    mockedLoginUser.mockResolvedValue({
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
        role: 'ROLE_USER',
      },
    });
  });

  test('renders nothing when closed', () => {
    render(
      <LoginModal
        isOpen={false}
        onClose={onClose}
        onSwitchToRegister={onSwitchToRegister}
      />
    );
    expect(screen.queryByText('login.title')).not.toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={onClose}
        onSwitchToRegister={onSwitchToRegister}
      />
    );
    fireEvent.click(screen.getByText('login.submit'));

    await waitFor(() => {
      expect(screen.getByText('login.email_required')).toBeInTheDocument();
      expect(screen.getByText('login.password_required')).toBeInTheDocument();
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  test('shows email validation error for invalid email', async () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={onClose}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    const emailInput = screen.getByPlaceholderText('login.email_placeholder');
    const passwordInput = screen.getByPlaceholderText(
      'login.password_placeholder'
    );

    fireEvent.input(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.input(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(screen.getByText('login.submit'));

    await waitFor(() => {
      expect(screen.getByText('login.email_invalid')).toBeInTheDocument();
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  test('submits form and closes modal with valid data', async () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={onClose}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('login.email_placeholder'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('login.password_placeholder'),
      { target: { value: 'password123' } }
    );
    fireEvent.click(screen.getByText('login.submit'));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  test('toggles password visibility', () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={onClose}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    const passwordInput = screen.getByPlaceholderText(
      'login.password_placeholder'
    );
    const toggleButton = screen.getByLabelText('Show password');

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(screen.getByLabelText('Hide password'));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('calls onSwitchToRegister when register link clicked', () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={onClose}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    fireEvent.click(screen.getByText('login.register_link'));
    expect(onSwitchToRegister).toHaveBeenCalledTimes(1);
  });

  test('shows invalid credentials error on 401', async () => {
    mockedLoginUser.mockRejectedValueOnce({
      type: 'client',
      status: 401,
      message: 'Bad credentials',
    });

    render(
      <LoginModal
        isOpen={true}
        onClose={onClose}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('login.email_placeholder'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('login.password_placeholder'),
      { target: { value: 'wrongpass' } }
    );
    fireEvent.click(screen.getByText('login.submit'));

    await waitFor(() => {
      expect(screen.getByText('login.invalidCredentials')).toBeInTheDocument();
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  test('opens EmailConfirmModal and closes login modal on 403', async () => {
    mockedLoginUser.mockRejectedValueOnce({
      type: 'client',
      status: 403,
      message: 'User is disabled',
    });

    render(
      <LoginModal
        isOpen={true}
        onClose={onClose}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('login.email_placeholder'), {
      target: { value: 'inactive@example.com' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('login.password_placeholder'),
      { target: { value: 'password123' } }
    );
    fireEvent.click(screen.getByText('login.submit'));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.getByRole('heading', { name: 'emailConfirm.title' })
    ).toBeInTheDocument();
    expect(screen.queryByText('login.accountDisabled')).not.toBeInTheDocument();
  });
  test('shows network error message on network error', async () => {
    mockedLoginUser.mockRejectedValueOnce({
      type: 'network',
      message: 'Network error',
    });

    render(
      <LoginModal
        isOpen={true}
        onClose={onClose}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('login.email_placeholder'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('login.password_placeholder'),
      { target: { value: 'password123' } }
    );
    fireEvent.click(screen.getByText('login.submit'));

    await waitFor(() => {
      expect(screen.getByText('login.networkError')).toBeInTheDocument();
    });

    expect(onClose).not.toHaveBeenCalled();
  });
});
