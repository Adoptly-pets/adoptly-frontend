import { render, screen } from '@testing-library/react';
import EmailConfirmModal from './EmailConfirmModal';

jest.mock('../../services/auth', () => ({
  resendActivationEmail: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
  Trans: ({ i18nKey }: { i18nKey: string }) => <>{i18nKey}</>,
}));

jest.mock('../Icon/Icon', () => ({
  Icon: ({ id }: { id: string }) => <svg data-testid={id} />,
}));

describe('EmailConfirmModal', () => {
  const defaultProps = {
    email: 'test@example.com',
    messageKey: 'emailConfirm.registeredMessage',
    hasActiveRateLimit: true,
    onClose: jest.fn(),
  };

  test('renders nothing when closed', () => {
    render(<EmailConfirmModal isOpen={false} {...defaultProps} />);
    expect(screen.queryByText('emailConfirm.title')).not.toBeInTheDocument();
  });

  test('renders panel content when open', () => {
    render(<EmailConfirmModal isOpen={true} {...defaultProps} />);
    expect(screen.getByText('emailConfirm.title')).toBeInTheDocument();
  });
});
