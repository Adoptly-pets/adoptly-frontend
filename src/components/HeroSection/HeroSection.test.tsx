import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeroSection from './HeroSection';

jest.mock(
  '../../assets/images/Hero/cat-footprint-1.webp',
  () => 'cat-footprint-1.webp'
);
jest.mock(
  '../../assets/images/Hero/cat-footprint-2.webp',
  () => 'cat-footprint-2.webp'
);
jest.mock('../../assets/images/Hero/pets.webp', () => 'pets.webp');

jest.mock('../Button/Button', () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

jest.mock('react-i18next');

describe('HeroSection Component', () => {
  test('renders the hero section with correct structure and content', () => {
    render(<HeroSection />);

    const section = screen.getByRole('region', {
      name: /знайди друга врятуй життя/i,
    });
    expect(section).toBeInTheDocument();

    const heading = screen.getByRole('heading', {
      name: /знайди друга врятуй життя/i,
    });
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(/свайпай, знайомся, допомагай/i);
    expect(description).toBeInTheDocument();

    const findPetButton = screen.getByRole('button', {
      name: /знайти улюбленця/i,
    });
    expect(findPetButton).toBeInTheDocument();

    const donateButton = screen.getByRole('button', { name: /задонатити/i });
    expect(donateButton).toBeInTheDocument();

    const petsImage = screen.getByAltText(/ілюстрація тварин для адопції/i);
    expect(petsImage).toBeInTheDocument();
    expect(petsImage).toHaveAttribute('src', 'pets.webp');

    const footprints = screen.getAllByAltText(/cat-footprint/i);
    expect(footprints).toHaveLength(2);
  });

  test('calls the correct function when buttons are clicked', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<HeroSection />);

    const findPetButton = screen.getByRole('button', {
      name: /знайти улюбленця/i,
    });
    fireEvent.click(findPetButton);
    expect(alertMock).toHaveBeenCalledWith(
      'Кнопка "Знайти улюбленця" натиснута!'
    );

    const donateButton = screen.getByRole('button', { name: /задонатити/i });
    fireEvent.click(donateButton);
    expect(alertMock).toHaveBeenCalledWith('Кнопка "Задонатити" натиснута!');

    alertMock.mockRestore();
  });
});
