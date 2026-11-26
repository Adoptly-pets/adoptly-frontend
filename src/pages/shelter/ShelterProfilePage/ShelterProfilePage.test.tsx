import { render, screen } from '@testing-library/react';
import ShelterProfilePage from './ShelterProfilePage';
import useMyShelter from '../../../hooks/useMyShelter';
import type { ShelterResponse } from '../../../services/shelter';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../../hooks/useMyShelter');

// The form has its own tests; here we only check what the page passes to it
jest.mock('../ShelterProfileForm/ShelterProfileForm', () => ({
  __esModule: true,
  default: (props: { savedShelter: ShelterResponse | null }) => (
    <p>form for {props.savedShelter ? props.savedShelter.slug : 'new'}</p>
  ),
}));

const mockedUseMyShelter = useMyShelter as jest.MockedFunction<
  typeof useMyShelter
>;

const shelter = { id: 7, slug: 'happy-paws' } as ShelterResponse;

describe('ShelterProfilePage', () => {
  test('shows a loading message and no form while loading', () => {
    mockedUseMyShelter.mockReturnValue({ status: 'loading' });

    render(<ShelterProfilePage />);

    expect(screen.getByText('common.loading')).toBeInTheDocument();
    expect(screen.queryByText(/form for/)).not.toBeInTheDocument();
  });

  test('shows an error and no form when loading fails', () => {
    mockedUseMyShelter.mockReturnValue({ status: 'error' });

    render(<ShelterProfilePage />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'shelter.pages.profile.loadError'
    );
    expect(screen.queryByText(/form for/)).not.toBeInTheDocument();
  });

  test('shows the empty form when there is no shelter yet', () => {
    mockedUseMyShelter.mockReturnValue({ status: 'loaded', shelter: null });

    render(<ShelterProfilePage />);

    expect(screen.getByText('form for new')).toBeInTheDocument();
  });

  test('passes the saved shelter to the form', () => {
    mockedUseMyShelter.mockReturnValue({ status: 'loaded', shelter });

    render(<ShelterProfilePage />);

    expect(screen.getByText('form for happy-paws')).toBeInTheDocument();
  });
});
