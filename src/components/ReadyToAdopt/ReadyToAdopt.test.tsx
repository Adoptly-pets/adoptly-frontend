import { render, screen } from '@testing-library/react';
import ReadyToAdopt from './ReadyToAdopt';

jest.mock(
  '../../assets/images/ReadyToAdopt/cat-footprint.webp',
  () => 'cat-footprint.webp'
);
jest.mock(
  '../../assets/images/ReadyToAdopt/cat-footprint-1.webp',
  () => 'cat-footprint-1.webp'
);
jest.mock(
  '../../assets/images/ReadyToAdopt/cat-footprint-2.webp',
  () => 'cat-footprint-2.webp'
);
jest.mock(
  '../../assets/images/ReadyToAdopt/cat-footprint-3.webp',
  () => 'cat-footprint-3.webp'
);
jest.mock('../../assets/images/Cat.webp', () => 'cat.webp');
jest.mock('../../assets/images/Dog.webp', () => 'dog.webp');

describe('ReadyToAdopt', () => {
  beforeEach(() => {
    render(<ReadyToAdopt />);
  });

  it('renders the title', () => {
    expect(
      screen.getByText('Готовий зустріти нового друга?')
    ).toBeInTheDocument();
  });

  it('renders the description', () => {
    expect(
      screen.getByText(/Обирай фільтри - котик чи собачка/)
    ).toBeInTheDocument();
  });

  it('renders the search button with correct text', () => {
    expect(screen.getByText('Почати пошук улюбленця')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /почати пошук улюбленця/i })
    ).toHaveAttribute('href', '#findpet');
  });

  it('renders dog and cat images', () => {
    expect(screen.getByAltText('dog')).toBeInTheDocument();
    expect(screen.getByAltText('cat')).toBeInTheDocument();
  });

  it('renders all footprint images', () => {
    const footprints = screen.getAllByAltText('cat-footprint');
    expect(footprints.length).toBe(4);
    footprints.forEach(footprint =>
      expect(footprint).toHaveAttribute('aria-hidden', 'true')
    );
  });
});
