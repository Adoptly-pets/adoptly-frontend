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
    render(<GoogleAuthButton onClick={onClick} />);
    expect(screen.getByTestId('icon-google')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    render(<GoogleAuthButton onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    render(<GoogleAuthButton onClick={onClick} disabled />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  test('has disabled attribute when disabled prop is true', () => {
    render(<GoogleAuthButton onClick={onClick} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
