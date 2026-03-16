import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginModal from './LoginModal';

jest.mock('../Icon/Icon', () => ({
  Icon: ({ id, className }: { id: string; className?: string }) => (
    <svg data-testid={id} className={className} />
  ),
}));

describe('LoginModal', () => {
  const onClose = jest.fn();
  const onSwitchToRegister = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    onSwitchToRegister.mockClear();
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
      expect(
        screen.getByText('login.email_required')
      ).toBeInTheDocument();
      expect(
        screen.getByText('login.password_required')
      ).toBeInTheDocument();
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

    const emailInput = screen.getByPlaceholderText(
      'login.email_placeholder'
    );
    const passwordInput = screen.getByPlaceholderText(
      'login.password_placeholder'
    );

    fireEvent.input(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.input(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(screen.getByText('login.submit'));

    await waitFor(() => {
      expect(
        screen.getByText('login.email_invalid')
      ).toBeInTheDocument();
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

    fireEvent.change(
      screen.getByPlaceholderText('login.email_placeholder'),
      { target: { value: 'test@example.com' } }
    );
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
});
