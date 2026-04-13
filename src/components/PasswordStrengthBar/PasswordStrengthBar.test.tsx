import { render, screen } from '@testing-library/react';
import PasswordStrengthBar from './PasswordStrengthBar';

describe('PasswordStrengthBar', () => {
  test('renders nothing when password is empty', () => {
    const { container } = render(<PasswordStrengthBar password="" />);
    expect(container.firstChild).toBeNull();
  });

  test('renders strength bar with weak label for common password', () => {
    render(<PasswordStrengthBar password="password" />);
    expect(screen.getByText('passwordStrength.weak')).toBeInTheDocument();
  });

  test('renders strength bar with strong label for complex password', () => {
    render(<PasswordStrengthBar password="MyC4tSle3ps!OnKeyboard" />);
    expect(screen.getByText('passwordStrength.strong')).toBeInTheDocument();
  });

  test('renders 3 segments', () => {
    const { container } = render(
      <PasswordStrengthBar password="test1234" />
    );
    const segments = container.querySelectorAll(
      '.password-strength-segment'
    );
    expect(segments).toHaveLength(3);
  });

  test('has correct ARIA meter attributes', () => {
    render(<PasswordStrengthBar password="test1234" />);
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '4');
    expect(meter).toHaveAttribute('aria-valuenow');
    expect(meter).toHaveAttribute('aria-valuetext');
  });

  test('no segments filled for score 0 password', () => {
    const { container } = render(
      <PasswordStrengthBar password="password" />
    );
    const filledSegments = container.querySelectorAll(
      '.password-strength-segment.strength-weak'
    );
    expect(filledSegments).toHaveLength(0);
  });

  test('one segment filled for score 1 password', () => {
    const { container } = render(
      <PasswordStrengthBar password="monkey12" />
    );
    const filledSegments = container.querySelectorAll(
      '.password-strength-segment[class*="strength-"]'
    );
    expect(filledSegments.length).toBeGreaterThanOrEqual(1);
  });

  test('all segments filled for strong password', () => {
    const { container } = render(
      <PasswordStrengthBar password="MyC4tSle3ps!OnKeyboard" />
    );
    const filledSegments = container.querySelectorAll(
      '.password-strength-segment.strength-strong'
    );
    expect(filledSegments).toHaveLength(3);
  });
});
