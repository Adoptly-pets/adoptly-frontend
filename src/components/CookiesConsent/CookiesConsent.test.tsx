import { render, screen, fireEvent } from '@testing-library/react';
import CookiesConsent from './CookiesConsent';

interface CookieModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
}

jest.mock(
  '../../components/CookieModal/CookieModal',
  () => (props: CookieModalProps) => {
    return props.isOpen ? (
      <div data-testid="cookie-modal">
        <button onClick={props.onAccept}>Accept</button>
        <button onClick={props.onClose}>Close</button>
      </div>
    ) : null;
  }
);

describe('CookiesConsent', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('shows modal if not accepted and not rejected this session', () => {
    render(<CookiesConsent />);
    expect(screen.getByTestId('cookie-modal')).toBeInTheDocument();
  });

  it('does not show modal if cookies already accepted', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    render(<CookiesConsent />);
    expect(screen.queryByTestId('cookie-modal')).not.toBeInTheDocument();
  });

  it('does not show modal if cookies rejected this session', () => {
    sessionStorage.setItem('cookiesRejectedThisSession', 'true');
    render(<CookiesConsent />);
    expect(screen.queryByTestId('cookie-modal')).not.toBeInTheDocument();
  });

  it('accepts cookies and closes modal', () => {
    render(<CookiesConsent />);
    fireEvent.click(screen.getByText('Accept'));
    expect(localStorage.getItem('cookiesAccepted')).toBe('true');
    expect(sessionStorage.getItem('cookiesRejectedThisSession')).toBeNull();
    expect(screen.queryByTestId('cookie-modal')).not.toBeInTheDocument();
  });

  it('closes modal and sets session rejected', () => {
    render(<CookiesConsent />);
    fireEvent.click(screen.getByText('Close'));
    expect(sessionStorage.getItem('cookiesRejectedThisSession')).toBe('true');
    expect(screen.queryByTestId('cookie-modal')).not.toBeInTheDocument();
  });
});
