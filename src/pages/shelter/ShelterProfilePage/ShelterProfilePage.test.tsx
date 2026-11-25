import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShelterProfilePage from './ShelterProfilePage';
import {
  createShelterProfile,
  uploadShelterLogo,
  type ShelterResponse,
} from '../../../services/shelter';

jest.mock('../../../services/shelter', () => ({
  createShelterProfile: jest.fn(),
  uploadShelterLogo: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'uk' },
  }),
  Trans: ({ i18nKey }: { i18nKey: string }) => <>{i18nKey}</>,
}));

jest.mock('../../../components/Icon/Icon', () => ({
  Icon: ({ id }: { id: string }) => <svg data-testid={id} />,
}));

jest.mock('../../../hooks/useCities', () => ({
  useCities: (slug: string | null) => ({
    cities: slug ? ['Київ', 'Бровари'] : [],
    loading: false,
    error: null,
  }),
}));

jest.mock('../../../components/SearchCombobox/SearchCombobox', () => {
  const MockCombobox = ({
    id,
    options,
    value,
    onChange,
    placeholder,
    disabled,
  }: {
    id?: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    disabled?: boolean;
  }) => (
    <select
      data-testid={id || 'combobox'}
      aria-label={placeholder}
      value={value}
      disabled={disabled}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">—</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
  return { __esModule: true, default: MockCombobox };
});

const mockedCreate = createShelterProfile as jest.MockedFunction<
  typeof createShelterProfile
>;
const mockedUpload = uploadShelterLogo as jest.MockedFunction<
  typeof uploadShelterLogo
>;

// Only the slug is used from the create response
const createdShelter = { slug: 'happypaws' } as ShelterResponse;

const getSubmitButton = () =>
  screen.getByRole('button', { name: /shelter.pages.profile.submit/ });

const selectPhoto = (file: File) =>
  fireEvent.change(document.getElementById('photo')!, {
    target: { files: [file] },
  });

const photoFile = new File(['image'], 'logo.png', { type: 'image/png' });

const renderPage = () =>
  render(
    <MemoryRouter>
      <ShelterProfilePage />
    </MemoryRouter>
  );

const fillValidForm = () => {
  fireEvent.input(
    screen.getByPlaceholderText('shelter.pages.profile.placeholders.name'),
    { target: { value: 'HappyPaws' } }
  );
  fireEvent.change(screen.getByTestId('region'), {
    target: { value: 'kyiv' },
  });
  fireEvent.change(screen.getByTestId('settlement'), {
    target: { value: 'Київ' },
  });
  fireEvent.input(
    screen.getByPlaceholderText('shelter.pages.profile.placeholders.address'),
    { target: { value: 'вул. Шевченка, 1' } }
  );
  fireEvent.input(
    screen.getByPlaceholderText(
      'shelter.pages.profile.placeholders.description'
    ),
    { target: { value: 'Притулок у Києві' } }
  );
  fireEvent.input(
    screen.getByPlaceholderText('shelter.pages.profile.placeholders.website'),
    { target: { value: 'https://happypaws.ua' } }
  );
  fireEvent.input(screen.getByLabelText(/firstName/), {
    target: { value: 'Марія' },
  });
  fireEvent.input(
    screen.getByPlaceholderText('shelter.pages.profile.placeholders.phone'),
    { target: { value: '+380671234567' } }
  );
  fireEvent.click(screen.getByRole('checkbox'));
};

describe('ShelterProfilePage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    mockedCreate.mockResolvedValue(createdShelter);
    mockedUpload.mockResolvedValue(undefined);
    // jsdom has no object URLs; the photo preview needs one
    URL.createObjectURL = jest.fn(() => 'blob:preview');
    URL.revokeObjectURL = jest.fn();
  });

  test('submit on empty form shows required errors', async () => {
    renderPage();

    fireEvent.click(
      screen.getByRole('button', { name: /shelter.pages.profile.submit/ })
    );

    await waitFor(() => {
      expect(
        screen.getByText('shelter.pages.profile.errors.nameRequired')
      ).toBeInTheDocument();
    });
    expect(
      screen.getByText('shelter.pages.profile.errors.addressRequired')
    ).toBeInTheDocument();
    expect(
      screen.getByText('shelter.pages.profile.errors.descriptionRequired')
    ).toBeInTheDocument();
    expect(
      screen.getByText('shelter.pages.profile.errors.firstNameRequired')
    ).toBeInTheDocument();
    expect(
      screen.getByText('shelter.pages.profile.errors.phoneRequired')
    ).toBeInTheDocument();
    expect(
      screen.getByText('shelter.pages.profile.errors.consentRequired')
    ).toBeInTheDocument();
    expect(mockedCreate).not.toHaveBeenCalled();
  });

  test('shows "at least one" error when all public pages are empty', async () => {
    renderPage();

    fireEvent.click(
      screen.getByRole('button', { name: /shelter.pages.profile.submit/ })
    );

    await waitFor(() => {
      expect(
        screen.getByText('shelter.pages.profile.errors.publicPagesRequired')
      ).toBeInTheDocument();
    });
  });

  test('settlement is disabled until a region is picked and resets when region changes', () => {
    renderPage();

    const settlement = screen.getByTestId('settlement');
    expect(settlement).toBeDisabled();

    fireEvent.change(screen.getByTestId('region'), {
      target: { value: 'kyiv' },
    });
    expect(settlement).not.toBeDisabled();

    fireEvent.change(settlement, { target: { value: 'Київ' } });
    expect(settlement).toHaveValue('Київ');

    fireEvent.change(screen.getByTestId('region'), {
      target: { value: 'lviv-oblast' },
    });
    expect(settlement).toHaveValue('');
  });

  test('description counter decreases as user types', () => {
    renderPage();

    const description = screen.getByPlaceholderText(
      'shelter.pages.profile.placeholders.description'
    );

    expect(
      screen.getByText('shelter.pages.profile.counter')
    ).toBeInTheDocument();

    fireEvent.input(description, { target: { value: 'hello' } });

    expect(description).toHaveValue('hello');
  });

  test('valid submit sends the request in the backend format and shows sent banner', async () => {
    renderPage();
    fillValidForm();

    fireEvent.click(getSubmitButton());

    await waitFor(() => {
      expect(mockedCreate).toHaveBeenCalledTimes(1);
    });
    expect(mockedCreate).toHaveBeenCalledWith({
      name: 'HappyPaws',
      region: 'Київ',
      city: 'Київ',
      address: 'вул. Шевченка, 1',
      description: 'Притулок у Києві',
      socialLinks: [{ url: 'https://happypaws.ua' }],
      contactFirstName: 'Марія',
      contactPhone: '+380671234567',
    });

    await waitFor(() => {
      expect(
        screen.getByText('shelter.pages.profile.sentMessage')
      ).toBeInTheDocument();
    });
  });

  test('does not upload a photo when none is selected', async () => {
    renderPage();
    fillValidForm();

    fireEvent.click(getSubmitButton());

    await waitFor(() => {
      expect(
        screen.getByText('shelter.pages.profile.sentMessage')
      ).toBeInTheDocument();
    });
    expect(mockedUpload).not.toHaveBeenCalled();
  });

  test('uploads the selected photo with the slug of the created shelter', async () => {
    renderPage();
    fillValidForm();
    selectPhoto(photoFile);

    fireEvent.click(getSubmitButton());

    await waitFor(() => {
      expect(mockedUpload).toHaveBeenCalledWith('happypaws', photoFile);
    });
    await waitFor(() => {
      expect(
        screen.getByText('shelter.pages.profile.sentMessage')
      ).toBeInTheDocument();
    });
  });

  test('keeps the button disabled until the photo is uploaded', async () => {
    let finishUpload: () => void = () => {};
    mockedUpload.mockReturnValueOnce(
      new Promise(resolve => {
        finishUpload = () => resolve(undefined);
      })
    );
    renderPage();
    fillValidForm();
    selectPhoto(photoFile);

    fireEvent.click(getSubmitButton());

    await waitFor(() => expect(mockedUpload).toHaveBeenCalled());
    expect(getSubmitButton()).toBeDisabled();
    expect(
      screen.queryByText('shelter.pages.profile.sentMessage')
    ).not.toBeInTheDocument();

    finishUpload();

    await waitFor(() => {
      expect(
        screen.getByText('shelter.pages.profile.sentMessage')
      ).toBeInTheDocument();
    });
  });

  test('restores draft from localStorage on reload', () => {
    localStorage.setItem(
      'shelter-profile-draft',
      JSON.stringify({ name: 'DraftedName', address: 'вул. Тестова' })
    );

    renderPage();

    expect(
      screen.getByPlaceholderText('shelter.pages.profile.placeholders.name')
    ).toHaveValue('DraftedName');
    expect(
      screen.getByPlaceholderText('shelter.pages.profile.placeholders.address')
    ).toHaveValue('вул. Тестова');
  });
});
