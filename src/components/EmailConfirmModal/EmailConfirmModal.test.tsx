import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmailConfirmModal from './EmailConfirmModal';
import { resendActivationEmail } from '../../services/auth';

jest.mock('../../services/auth', () => ({
  resendActivationEmail: jest.fn(),
}));

const mockedResend = resendActivationEmail as jest.MockedFunction<
  typeof resendActivationEmail
>;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, values?: Record<string, string | number>) => {
      if (values) {
        const parts = Object.entries(values)
          .map(([k, v]) => `${k}=${v}`)
          .join(' ');
        return `${key} ${parts}`;
      }
      return key;
    },
    i18n: { language: 'en' },
  }),
  Trans: ({
    i18nKey,
    values,
  }: {
    i18nKey: string;
    values?: Record<string, string>;
  }) => <>{`${i18nKey}${values ? ` ${JSON.stringify(values)}` : ''}`}</>,
}));

jest.mock('../Icon/Icon', () => ({
  Icon: ({ id }: { id: string }) => <svg data-testid={id} />,
}));

const TIMER_SECONDS = 120;

const advanceSeconds = (seconds: number) => {
  act(() => {
    jest.advanceTimersByTime(seconds * 1000);
  });
};

describe('EmailConfirmModal', () => {
  const onClose = jest.fn();
  const email = 'test@example.com';

  beforeEach(() => {
    jest.useFakeTimers();
    onClose.mockClear();
    mockedResend.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders nothing when closed', () => {
    render(
      <EmailConfirmModal isOpen={false} email={email} onClose={onClose} />
    );
    expect(
      screen.queryByText('emailConfirm.title')
    ).not.toBeInTheDocument();
  });

  test('shows title, email, and disabled resend button with 2:00 countdown on open', () => {
    render(<EmailConfirmModal isOpen={true} email={email} onClose={onClose} />);

    expect(
      screen.getByText('emailConfirm.title')
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(email))).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: /emailConfirm\.resendWithTimer/,
    });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('2:00');
  });

  test('countdown ticks down over time', () => {
    render(<EmailConfirmModal isOpen={true} email={email} onClose={onClose} />);

    advanceSeconds(1);
    expect(screen.getByRole('button', { name: /resend/i })).toHaveTextContent(
      '1:59'
    );

    advanceSeconds(59);
    expect(screen.getByRole('button', { name: /resend/i })).toHaveTextContent(
      '1:00'
    );
  });

  test('after countdown expires, button becomes enabled with plain resend text', () => {
    render(<EmailConfirmModal isOpen={true} email={email} onClose={onClose} />);

    advanceSeconds(TIMER_SECONDS);

    const button = screen.getByRole('button', {
      name: 'emailConfirm.resend',
    });
    expect(button).toBeEnabled();
    expect(button).not.toHaveTextContent(':');
  });

  test('clicking resend calls service with email and shows success + restarts countdown', async () => {
    mockedResend.mockResolvedValue(undefined);
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<EmailConfirmModal isOpen={true} email={email} onClose={onClose} />);

    advanceSeconds(TIMER_SECONDS);
    await user.click(screen.getByRole('button', { name: /resend/i }));

    expect(mockedResend).toHaveBeenCalledWith(email);
    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(
        'emailConfirm.resent'
      );
    });

    const button = screen.getByRole('button', { name: /resend/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('2:00');
  });

  test('on failure, shows error message and does not restart countdown', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockedResend.mockRejectedValue(new Error('Network error'));
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<EmailConfirmModal isOpen={true} email={email} onClose={onClose} />);

    advanceSeconds(TIMER_SECONDS);
    await user.click(screen.getByRole('button', { name: /resend/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'emailConfirm.failed'
      );
    });

    const button = screen.getByRole('button', {
      name: 'emailConfirm.resend',
    });
    expect(button).toBeEnabled();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
