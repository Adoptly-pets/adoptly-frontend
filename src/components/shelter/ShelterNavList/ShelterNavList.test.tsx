import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShelterNavList from './ShelterNavList';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'uk', changeLanguage: jest.fn() },
  }),
}));

describe('ShelterNavList', () => {
  test('calls onItemClick when an item is clicked', () => {
    const onItemClick = jest.fn();
    render(
      <MemoryRouter initialEntries={['/uk/shelter/profile']}>
        <ShelterNavList onItemClick={onItemClick} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('shelter.menu.pets'));

    expect(onItemClick).toHaveBeenCalledTimes(1);
  });
});
