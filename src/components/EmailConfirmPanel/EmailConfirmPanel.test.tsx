import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmailConfirmPanel from './EmailConfirmPanel';
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

const TIMER_SECONDS = 120;

const advanceSeconds = (seconds: number) => {
  act(() => {
    jest.advanceTimersByTime(seconds * 1000);
  });
};

describe('EmailConfirmPanel', () => {
  const email = 'test@example.com';

  beforeEach(() => {
    jest.useFakeTimers();
    mockedResend.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('shows title, email, and disabled resend button with 2:00 countdown when rate limit is active', () => {
    render(
      <EmailConfirmPanel
        email={email}
        messageKey="emailConfirm.registeredMessage"
        hasActiveRateLimit
      />
    );

    expect(screen.getByText('emailConfirm.title')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(email))).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: /emailConfirm\.resendWithTimer/,
    });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('2:00');
  });

  test('countdown ticks down over time', () => {
    render(
      <EmailConfirmPanel
        email={email}
        messageKey="emailConfirm.registeredMessage"
        hasActiveRateLimit
      />
    );

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
    render(
      <EmailConfirmPanel
        email={email}
        messageKey="emailConfirm.registeredMessage"
        hasActiveRateLimit
      />
    );

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
    render(
      <EmailConfirmPanel
        email={email}
        messageKey="emailConfirm.registeredMessage"
        hasActiveRateLimit
      />
    );

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

  test('resend button is enabled immediately when hasActiveRateLimit is false', () => {
    render(
      <EmailConfirmPanel
        email={email}
        messageKey="emailConfirm.notActivatedMessage"
        hasActiveRateLimit={false}
      />
    );

    const button = screen.getByRole('button', {
      name: 'emailConfirm.resend',
    });
    expect(button).toBeEnabled();
    expect(button).not.toHaveTextContent(':');
  });

  test('successful resend starts 2:00 cooldown even when hasActiveRateLimit is false', async () => {
    mockedResend.mockResolvedValue(undefined);
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <EmailConfirmPanel
        email={email}
        messageKey="emailConfirm.notActivatedMessage"
        hasActiveRateLimit={false}
      />
    );

    await user.click(screen.getByRole('button', { name: /resend/i }));

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    const button = screen.getByRole('button', { name: /resend/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('2:00');
  });

  test('renders the message from the messageKey prop', () => {
    render(
      <EmailConfirmPanel
        email={email}
        messageKey="emailConfirm.notActivatedMessage"
        hasActiveRateLimit={false}
      />
    );

    expect(
      screen.getByText(new RegExp('emailConfirm.notActivatedMessage'))
    ).toBeInTheDocument();
  });

  test('on failure, shows error message and does not restart countdown', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockedResend.mockRejectedValue(new Error('Network error'));
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <EmailConfirmPanel
        email={email}
        messageKey="emailConfirm.registeredMessage"
        hasActiveRateLimit
      />
    );

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
