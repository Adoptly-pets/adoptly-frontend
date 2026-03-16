import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationModal from './RegistrationModal';

jest.mock('../Icon/Icon', () => ({
  Icon: ({ id, className }: { id: string; className?: string }) => (
    <svg data-testid={id} className={className} />
  ),
}));

describe('RegistrationModal', () => {
  const onClose = jest.fn();
  const onSwitchToLogin = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    onSwitchToLogin.mockClear();
  });

  test('renders nothing when closed', () => {
    render(<RegistrationModal isOpen={false} onClose={onClose} onSwitchToLogin={onSwitchToLogin} />);
    expect(screen.queryByText('registration.title')).not.toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    render(<RegistrationModal isOpen={true} onClose={onClose} onSwitchToLogin={onSwitchToLogin} />);
    fireEvent.click(screen.getByText('registration.submit'));

    await waitFor(() => {
      expect(screen.getByText('registration.role_required')).toBeInTheDocument();
      expect(screen.getByText('registration.email_required')).toBeInTheDocument();
      expect(screen.getByText('registration.password_required')).toBeInTheDocument();
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  test('shows email validation error for invalid email', async () => {
    render(<RegistrationModal isOpen={true} onClose={onClose} onSwitchToLogin={onSwitchToLogin} />);

    const emailInput = screen.getByPlaceholderText('registration.email_placeholder');
    const passwordInput = screen.getByPlaceholderText('registration.password_placeholder');

    fireEvent.click(screen.getByText('registration.role_adopter'));
    fireEvent.input(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.input(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(screen.getByText('registration.submit'));

    await waitFor(() => {
      expect(screen.getByText('registration.email_invalid')).toBeInTheDocument();
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  test('submits form and closes modal with valid data', async () => {
    render(<RegistrationModal isOpen={true} onClose={onClose} onSwitchToLogin={onSwitchToLogin} />);

    fireEvent.click(screen.getByText('registration.role_adopter'));
    fireEvent.change(screen.getByPlaceholderText('registration.email_placeholder'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('registration.password_placeholder'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('registration.submit'));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  test('toggles password visibility', () => {
    render(<RegistrationModal isOpen={true} onClose={onClose} onSwitchToLogin={onSwitchToLogin} />);

    const passwordInput = screen.getByPlaceholderText('registration.password_placeholder');
    const toggleButton = screen.getByLabelText('Show password');

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(screen.getByLabelText('Hide password'));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
