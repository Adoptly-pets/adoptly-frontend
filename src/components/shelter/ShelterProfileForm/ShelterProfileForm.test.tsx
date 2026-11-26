import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShelterProfileForm from './ShelterProfileForm';
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

const renderForm = (savedShelter: ShelterResponse | null = null) =>
  render(
    <MemoryRouter>
      <ShelterProfileForm savedShelter={savedShelter} />
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

describe('ShelterProfileForm', () => {
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
    renderForm();

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
    renderForm();

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
    renderForm();

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
    renderForm();

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
    renderForm();
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
      socialLinks: [
        { url: 'https://happypaws.ua' },
        { url: '' },
        { url: '' },
        { url: '' },
      ],
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
    renderForm();
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
    renderForm();
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
    renderForm();
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

  test('shows sent banner and clears the draft when the photo upload fails', async () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockedUpload.mockRejectedValueOnce(new Error('Upload failed'));
    renderForm();
    fillValidForm();
    selectPhoto(photoFile);

    fireEvent.click(getSubmitButton());

    await waitFor(() => {
      expect(
        screen.getByText('shelter.pages.profile.sentMessage')
      ).toBeInTheDocument();
    });
    expect(mockedCreate).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem('shelter-profile-draft')).toBeNull();
    expect(consoleError).toHaveBeenCalledWith(
      'uploadShelterLogo failed:',
      expect.any(Error)
    );
    consoleError.mockRestore();
  });

  describe('when the shelter is not created', () => {
    test('shows the error, keeps the draft and does not upload the photo', async () => {
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockedCreate.mockRejectedValueOnce({ type: 'server', status: 500 });
      renderForm();
      fillValidForm();
      selectPhoto(photoFile);

      fireEvent.click(getSubmitButton());

      expect(await screen.findByRole('alert')).toHaveTextContent(
        'errors.serverError'
      );
      expect(mockedUpload).not.toHaveBeenCalled();
      expect(localStorage.getItem('shelter-profile-draft')).not.toBeNull();
      expect(
        screen.queryByText('shelter.pages.profile.sentMessage')
      ).not.toBeInTheDocument();
      expect(getSubmitButton()).toBeEnabled();
      consoleError.mockRestore();
    });

    test('shows a network error when there is no connection', async () => {
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockedCreate.mockRejectedValueOnce({
        type: 'network',
        message: 'Network error. Please check your connection.',
      });
      renderForm();
      fillValidForm();

      fireEvent.click(getSubmitButton());

      expect(await screen.findByRole('alert')).toHaveTextContent(
        'errors.networkError'
      );
      consoleError.mockRestore();
    });
  });

  test('fills the form with the saved shelter', () => {
    renderForm({
      id: 7,
      slug: 'happy-paws',
      status: 'PENDING',
      photoUrl: null,
      name: 'HappyPaws',
      region: 'Київ',
      city: 'Київ',
      address: 'вул. Шевченка, 1',
      description: 'Притулок у Києві',
      socialLinks: [],
      contactFirstName: 'Марія',
      contactPhone: '+380671234567',
    });

    expect(
      screen.getByPlaceholderText('shelter.pages.profile.placeholders.name')
    ).toHaveValue('HappyPaws');
    expect(screen.getByTestId('region')).toHaveValue('kyiv');
    expect(screen.getByTestId('settlement')).toHaveValue('Київ');
    expect(
      screen.getByPlaceholderText('shelter.pages.profile.placeholders.phone')
    ).toHaveValue('+380671234567');
  });

  test('ignores the draft when there is a saved shelter', () => {
    localStorage.setItem(
      'shelter-profile-draft',
      JSON.stringify({ name: 'DraftedName' })
    );

    renderForm({
      id: 7,
      slug: 'happy-paws',
      status: 'PENDING',
      photoUrl: null,
      name: 'HappyPaws',
      region: 'Київ',
      city: 'Київ',
      address: 'вул. Шевченка, 1',
      description: 'Притулок у Києві',
      socialLinks: [],
      contactFirstName: 'Марія',
      contactPhone: '+380671234567',
    });

    expect(
      screen.getByPlaceholderText('shelter.pages.profile.placeholders.name')
    ).toHaveValue('HappyPaws');
  });

  test('restores draft from localStorage on reload', () => {
    localStorage.setItem(
      'shelter-profile-draft',
      JSON.stringify({ name: 'DraftedName', address: 'вул. Тестова' })
    );

    renderForm();

    expect(
      screen.getByPlaceholderText('shelter.pages.profile.placeholders.name')
    ).toHaveValue('DraftedName');
    expect(
      screen.getByPlaceholderText('shelter.pages.profile.placeholders.address')
    ).toHaveValue('вул. Тестова');
  });
});
