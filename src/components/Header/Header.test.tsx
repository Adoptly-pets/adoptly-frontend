import { render, screen } from '@testing-library/react';
import Header from './Header';

jest.mock('../Icon/Icon', () => ({
  Icon: ({ id, size }: { id: string; size?: number }) => (
    <svg data-testid={`icon-${id}`} width={size} height={size} />
  ),
}));

jest.mock('../Navigation/Navigation', () => ({
  __esModule: true,
  default: () => <nav data-testid="navigation" />,
}));

describe('Header Component', () => {
  test('renders the header with correct structure', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const navigation = screen.getByTestId('navigation');
    expect(navigation).toBeInTheDocument();

    const languageButton = screen.getByRole('button', {
      name: /switch language to ukrainian/i,
    });
    expect(languageButton).toBeInTheDocument();
    expect(languageButton).toHaveAttribute('aria-pressed', 'true');

    const favouriteButton = screen.getByRole('button', { name: /favourite/i });
    expect(favouriteButton).toBeInTheDocument();

    const userButton = screen.getByRole('button', { name: /username/i });
    expect(userButton).toBeInTheDocument();
  });

  test('renders icons with correct attributes', () => {
    render(<Header />);

    const heartIcon = screen.getByTestId('icon-icon-heart');
    expect(heartIcon).toBeInTheDocument();
    expect(heartIcon).toHaveAttribute('width', '16');
    expect(heartIcon).toHaveAttribute('height', '16');

    const userIcon = screen.getByTestId('icon-icon-user');
    expect(userIcon).toBeInTheDocument();
    expect(userIcon).toHaveAttribute('width', '16');
    expect(userIcon).toHaveAttribute('height', '16');
  });
});
