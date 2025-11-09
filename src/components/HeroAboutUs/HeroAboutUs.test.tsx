import { render, screen } from '@testing-library/react';
import HeroAboutUs from './HeroAboutUs';

describe('HeroAboutUs', () => {
  it('renders the title', () => {
    render(<HeroAboutUs />);
    expect(screen.getByText('Adoptly')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<HeroAboutUs />);
    expect(
      screen.getByText(
        /Cервіс, де кожен охочий може знайти свого улюбленця з усіх притулків України./i
      )
    ).toBeInTheDocument();
  });

  it('renders both search buttons', () => {
    render(<HeroAboutUs />);
    expect(screen.getByText('Почати пошук')).toBeInTheDocument();
    expect(screen.getByText('Почати пошук улюбленця')).toBeInTheDocument();
  });

  it('section has correct class', () => {
    render(<HeroAboutUs />);
    const section = screen.getByRole('region');
    expect(section).toHaveClass('hero-background');
  });
});
