import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CookieModal from './CookieModal';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

jest.mock('../../components/Icon/Icon', () => ({
  Icon: () => <span data-testid="icon-mock" />,
}));

jest.mock(
  '../../components/Button/Button',
  () =>
    (
      props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
        children: React.ReactNode;
      }
    ) => <button {...props}>{props.children}</button>
);

describe('CookieModal', () => {
  const onAccept = jest.fn();
  const onClose = jest.fn();

  it('does not render when isOpen is false', () => {
    render(
      <CookieModal isOpen={false} onAccept={onAccept} onClose={onClose} />
    );
    expect(screen.queryByText('COOKIES')).not.toBeInTheDocument();
  });

  it('renders modal when isOpen is true', () => {
    render(<CookieModal isOpen={true} onAccept={onAccept} onClose={onClose} />);
    expect(screen.getByText('COOKIES')).toBeInTheDocument();
    expect(screen.getByText('cookies.text')).toBeInTheDocument();
    expect(screen.getByText('cookies.accept')).toBeInTheDocument();
    expect(screen.getByText('cookies.more')).toBeInTheDocument();
    expect(screen.getByTestId('icon-mock')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<CookieModal isOpen={true} onAccept={onAccept} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onAccept when accept button is clicked', () => {
    render(<CookieModal isOpen={true} onAccept={onAccept} onClose={onClose} />);
    fireEvent.click(screen.getByText('cookies.accept'));
    expect(onAccept).toHaveBeenCalled();
  });

  it('opens Wikipedia when "more" button is clicked', () => {
    window.open = jest.fn();
    render(<CookieModal isOpen={true} onAccept={onAccept} onClose={onClose} />);
    fireEvent.click(screen.getByText('cookies.more'));
    expect(window.open).toHaveBeenCalledWith(
      'https://en.wikipedia.org/wiki/HTTP_cookie',
      '_blank'
    );
  });
});
