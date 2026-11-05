import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import i18n from 'i18next';
import ShelterSidebar from './ShelterSidebar';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'uk', changeLanguage: jest.fn() },
  }),
}));

const TestLayout = () => (
  <>
    <ShelterSidebar />
    <Outlet />
  </>
);

const renderAt = (route: string) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/:lng/shelter" element={<TestLayout />}>
          <Route path="profile" element={null} />
          <Route path="pets" element={null} />
          <Route path="applications" element={null} />
          <Route path="analytics" element={null} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe('ShelterSidebar', () => {
  afterEach(() => {
    i18n.language = 'uk';
  });

  test('renders all four menu items', () => {
    renderAt('/uk/shelter/profile');

    expect(screen.getByText('shelter.menu.profile')).toBeInTheDocument();
    expect(screen.getByText('shelter.menu.pets')).toBeInTheDocument();
    expect(screen.getByText('shelter.menu.applications')).toBeInTheDocument();
    expect(screen.getByText('shelter.menu.analytics')).toBeInTheDocument();
  });

  test('renders <nav> with aria-label from translations', () => {
    renderAt('/uk/shelter/profile');

    expect(screen.getByLabelText('shelter.menu.ariaLabel')).toBeInTheDocument();
  });

  test('marks the active item with aria-current="page" based on URL', () => {
    renderAt('/uk/shelter/applications');

    expect(screen.getByText('shelter.menu.applications')).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByText('shelter.menu.profile')).not.toHaveAttribute(
      'aria-current'
    );
  });

  test('renders links pointing to the correct shelter routes', () => {
    renderAt('/uk/shelter/profile');

    expect(
      screen.getByText('shelter.menu.profile').closest('a')
    ).toHaveAttribute('href', '/uk/shelter/profile');
    expect(screen.getByText('shelter.menu.pets').closest('a')).toHaveAttribute(
      'href',
      '/uk/shelter/pets'
    );
    expect(
      screen.getByText('shelter.menu.applications').closest('a')
    ).toHaveAttribute('href', '/uk/shelter/applications');
    expect(
      screen.getByText('shelter.menu.analytics').closest('a')
    ).toHaveAttribute('href', '/uk/shelter/analytics');
  });

  test('keeps current language in links', () => {
    i18n.language = 'en';
    renderAt('/en/shelter/profile');

    expect(screen.getByText('shelter.menu.pets').closest('a')).toHaveAttribute(
      'href',
      '/en/shelter/pets'
    );
  });
});
