import { render, screen, fireEvent } from '@testing-library/react';
import GoogleAuthButton from './GoogleAuthButton';

jest.mock('../Icon/Icon', () => ({
  Icon: ({ id, className }: { id: string; className?: string }) => (
    <svg data-testid={id} className={className} />
  ),
}));

describe('GoogleAuthButton', () => {
  const onClick = jest.fn();

  beforeEach(() => {
    onClick.mockClear();
  });

  test('renders Google icon', () => {
    render(<GoogleAuthButton onClick={onClick} ariaLabel="Sign in with Google" />);
    expect(screen.getByTestId('icon-google')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    render(<GoogleAuthButton onClick={onClick} ariaLabel="Sign in with Google" />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('has correct aria-label', () => {
    render(<GoogleAuthButton onClick={onClick} ariaLabel="Sign in with Google" />);
    expect(screen.getByLabelText('Sign in with Google')).toBeInTheDocument();
  });

  test('has type="button" to prevent form submission', () => {
    render(<GoogleAuthButton onClick={onClick} ariaLabel="Sign in with Google" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
