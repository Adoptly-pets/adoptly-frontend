import { render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../Icon/Icon', () => ({
  Icon: ({ id, size }: { id: string; size?: number }) => (
    <svg data-testid={`icon-${id}`} width={size} height={size} />
  ),
}));

jest.mock('../Navigation/Navigation', () => ({
  __esModule: true,
  default: () => <nav data-testid="navigation" />,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'uk', changeLanguage: jest.fn() },
  }),
}));

describe('Header Component', () => {
  test('renders the header with correct structure', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const navigation = screen.getByTestId('navigation');
    expect(navigation).toBeInTheDocument();

    const languageButton = screen.getByLabelText(/switch language/i);
    expect(languageButton).toBeInTheDocument();

    const favouriteButton = screen.getByTitle(/favourite/i);
    expect(favouriteButton).toBeInTheDocument();

    const userButton = screen.getByTitle(/username/i);
    expect(userButton).toBeInTheDocument();
  });

  test('renders icons with correct attributes', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoIcon = screen.getByTestId('icon-icon-Logo');
    expect(logoIcon).toBeInTheDocument();

    const logoLink = logoIcon.closest('a');
    expect(logoLink).toHaveAttribute('href', '/');

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
