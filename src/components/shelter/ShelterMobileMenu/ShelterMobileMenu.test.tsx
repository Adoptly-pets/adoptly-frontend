import { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShelterMobileMenu from './ShelterMobileMenu';
import { AuthProvider } from '../../../context/AuthContext';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'uk', changeLanguage: jest.fn() },
  }),
}));

const renderMenu = () => {
  const onClose = jest.fn();
  const triggerRef = createRef<HTMLButtonElement>();

  render(
    <MemoryRouter initialEntries={['/uk/shelter/profile']}>
      <AuthProvider>
        <button ref={triggerRef}>trigger</button>
        <p>outside</p>
        <ShelterMobileMenu
          id="shelter-menu"
          onClose={onClose}
          triggerRef={triggerRef}
        />
      </AuthProvider>
    </MemoryRouter>
  );

  return { onClose };
};

describe('ShelterMobileMenu', () => {
  test('renders sections and logout button', () => {
    renderMenu();

    expect(screen.getByText('shelter.menu.profile')).toBeInTheDocument();
    expect(screen.getByText('shelter.menu.pets')).toBeInTheDocument();
    expect(screen.getByText('shelter.menu.applications')).toBeInTheDocument();
    expect(screen.getByText('shelter.menu.analytics')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'shelter.menu.logout' })
    ).toBeInTheDocument();
  });

  test('closes when a section is selected', () => {
    const { onClose } = renderMenu();

    fireEvent.click(screen.getByText('shelter.menu.pets'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('closes on Escape and returns focus to the trigger', () => {
    const { onClose } = renderMenu();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'trigger' })).toHaveFocus();
  });

  test('closes on pointer down outside the menu', () => {
    const { onClose } = renderMenu();

    fireEvent.pointerDown(screen.getByText('outside'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('stays open on pointer down inside the menu or on the trigger', () => {
    const { onClose } = renderMenu();

    fireEvent.pointerDown(screen.getByText('shelter.menu.pets'));
    fireEvent.pointerDown(screen.getByRole('button', { name: 'trigger' }));

    expect(onClose).not.toHaveBeenCalled();
  });
});
