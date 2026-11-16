import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AddPetPage from './AddPetPage';
import { createPet } from '../../../services/pets';

jest.mock('../../../services/pets');
const mockCreatePet = createPet as jest.MockedFunction<typeof createPet>;

// Appends count so the description counter can be asserted
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { count?: number }) =>
      options?.count === undefined ? key : `${key}:${options.count}`,
    i18n: { language: 'uk', changeLanguage: jest.fn() },
  }),
}));

const ERRORS = [
  'shelter.pages.addPet.errors.nameRequired',
  'shelter.pages.addPet.errors.speciesRequired',
  'shelter.pages.addPet.errors.genderRequired',
  'shelter.pages.addPet.errors.ageRequired',
  'shelter.pages.addPet.errors.descriptionRequired',
];

const getNameInput = () =>
  screen.getByLabelText(/shelter\.pages\.addPet\.fields\.name/);

const getAgeInput = () =>
  screen.getByLabelText(/shelter\.pages\.addPet\.fields\.age\b/);

const SIZE_ERROR = 'shelter.pages.addPet.errors.sizeRequired';

const selectSpecies = (species: 'DOG' | 'CAT') =>
  userEvent.selectOptions(
    screen.getByRole('combobox', {
      name: /shelter\.pages\.addPet\.fields\.species/,
    }),
    species
  );

const querySizeSelect = () =>
  screen.queryByRole('combobox', {
    name: /shelter\.pages\.addPet\.fields\.size\b/,
  });

const getDescription = () =>
  screen.getByRole('textbox', {
    name: /shelter\.pages\.addPet\.fields\.description/,
  });

const submit = () =>
  userEvent.click(
    screen.getByRole('button', { name: 'shelter.pages.addPet.submit' })
  );

const renderPage = () =>
  render(
    <MemoryRouter>
      <AddPetPage />
    </MemoryRouter>
  );

// A cat needs no size, so these are all the required fields
const fillRequiredFields = async () => {
  await userEvent.type(getNameInput(), 'Murka');
  await selectSpecies('CAT');
  await userEvent.click(
    screen.getByRole('radio', {
      name: 'shelter.pages.addPet.options.gender.FEMALE',
    })
  );
  await userEvent.type(getAgeInput(), '3');
  await userEvent.type(getDescription(), 'Calm cat');
};

const getArrivalMonth = () =>
  screen.getByRole('combobox', {
    name: 'shelter.pages.addPet.fields.arrivalMonth',
  });

const getArrivalYear = () =>
  screen.getByRole('combobox', {
    name: 'shelter.pages.addPet.fields.arrivalYear',
  });

const ARRIVAL_INCOMPLETE = 'shelter.pages.addPet.errors.arrivalIncomplete';
const ARRIVAL_FUTURE = 'shelter.pages.addPet.errors.arrivalFuture';

describe('AddPetPage', () => {
  beforeEach(() => {
    mockCreatePet.mockClear();
  });

  test('fields are reachable by their labels', () => {
    renderPage();

    expect(
      screen.getByLabelText(/shelter\.pages\.addPet\.fields\.name/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', {
        name: /shelter\.pages\.addPet\.fields\.species/,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: /shelter\.pages\.addPet\.fields\.description/,
      })
    ).toBeInTheDocument();

    const gender = screen.getByRole('group', {
      name: /shelter\.pages\.addPet\.fields\.gender/,
    });
    expect(within(gender).getAllByRole('radio')).toHaveLength(2);
  });

  test('back link leads to the shelter pets list', () => {
    renderPage();

    expect(
      screen.getByRole('link', { name: 'shelter.pages.addPet.backToList' })
    ).toHaveAttribute('href', '/uk/shelter/pets');
  });

  test('species options use Species values', () => {
    renderPage();

    const select = screen.getByRole('combobox', {
      name: /shelter\.pages\.addPet\.fields\.species/,
    });
    const values = within(select)
      .getAllByRole('option')
      .map(option => option.getAttribute('value'));

    expect(values).toEqual(['', 'DOG', 'CAT']);
  });

  describe('validation', () => {
    test('empty submit shows an error for every required field', async () => {
      renderPage();

      await submit();

      for (const error of ERRORS) {
        expect(await screen.findByText(error)).toBeInTheDocument();
      }
      expect(getNameInput()).toHaveAttribute('aria-invalid', 'true');
      expect(getDescription()).toHaveAttribute('aria-invalid', 'true');
      screen
        .getAllByRole('radio')
        .forEach(radio =>
          expect(radio).toHaveAttribute('aria-invalid', 'true')
        );
    });

    test('filling a field clears its error', async () => {
      renderPage();
      await submit();
      expect(
        await screen.findByText('shelter.pages.addPet.errors.nameRequired')
      ).toBeInTheDocument();

      await userEvent.type(getNameInput(), 'Rex');

      expect(
        screen.queryByText('shelter.pages.addPet.errors.nameRequired')
      ).not.toBeInTheDocument();
      expect(getNameInput()).toHaveAttribute('aria-invalid', 'false');
    });

    test('valid form submits without errors', async () => {
      renderPage();

      await userEvent.type(getNameInput(), 'Rex');
      await selectSpecies('DOG');
      await userEvent.selectOptions(querySizeSelect()!, 'MEDIUM');
      await userEvent.click(
        screen.getByRole('radio', {
          name: 'shelter.pages.addPet.options.gender.MALE',
        })
      );
      await userEvent.type(getAgeInput(), '2');
      await userEvent.type(getDescription(), 'Friendly dog');
      await submit();

      for (const error of [...ERRORS, SIZE_ERROR]) {
        expect(screen.queryByText(error)).not.toBeInTheDocument();
      }
    });

    test('age of 0 shows the age error', async () => {
      renderPage();

      await userEvent.type(getAgeInput(), '0');
      await submit();

      expect(
        await screen.findByText('shelter.pages.addPet.errors.ageRequired')
      ).toBeInTheDocument();
    });
  });

  describe('size', () => {
    test('is hidden until Dog is selected', async () => {
      renderPage();
      expect(querySizeSelect()).not.toBeInTheDocument();

      await selectSpecies('CAT');
      expect(querySizeSelect()).not.toBeInTheDocument();

      await selectSpecies('DOG');
      expect(querySizeSelect()).toBeInTheDocument();
    });

    test('options use Size values', async () => {
      renderPage();
      await selectSpecies('DOG');

      const values = within(querySizeSelect()!)
        .getAllByRole('option')
        .map(option => option.getAttribute('value'));

      expect(values).toEqual(['', 'SMALL', 'MEDIUM', 'LARGE']);
    });

    test('is required for a dog', async () => {
      renderPage();
      await selectSpecies('DOG');
      await submit();

      expect(await screen.findByText(SIZE_ERROR)).toBeInTheDocument();
      expect(querySizeSelect()).toHaveAttribute('aria-invalid', 'true');
    });

    test('switching to Cat drops the size from submitted data', async () => {
      renderPage();

      await userEvent.type(getNameInput(), 'Murka');
      await selectSpecies('DOG');
      await userEvent.selectOptions(querySizeSelect()!, 'LARGE');
      await selectSpecies('CAT');
      await userEvent.click(
        screen.getByRole('radio', {
          name: 'shelter.pages.addPet.options.gender.FEMALE',
        })
      );
      await userEvent.type(getAgeInput(), '3');
      await userEvent.type(getDescription(), 'Calm cat');
      await submit();

      expect(querySizeSelect()).not.toBeInTheDocument();
      expect(mockCreatePet).toHaveBeenCalledTimes(1);
      expect(mockCreatePet.mock.calls[0][0]).not.toHaveProperty('size');
    });
  });

  test('age unit labels follow the entered number', async () => {
    renderPage();

    expect(
      screen.getByText('shelter.pages.addPet.options.ageUnit.YEARS:0')
    ).toBeInTheDocument();

    await userEvent.type(getAgeInput(), '5');

    expect(
      screen.getByText('shelter.pages.addPet.options.ageUnit.YEARS:5')
    ).toBeInTheDocument();
    expect(
      screen.getByText('shelter.pages.addPet.options.ageUnit.MONTHS:5')
    ).toBeInTheDocument();
  });

  test('description counter shows remaining characters', async () => {
    renderPage();

    expect(
      screen.getByText('shelter.pages.addPet.counter:1500')
    ).toBeInTheDocument();

    await userEvent.type(getDescription(), 'Rex');

    expect(
      screen.getByText('shelter.pages.addPet.counter:1497')
    ).toBeInTheDocument();
  });

  describe('spayed/neutered switch', () => {
    const getSwitch = () =>
      screen.getByRole('switch', {
        name: 'shelter.pages.addPet.fields.spayedNeutered',
      });

    test('is off by default', () => {
      renderPage();

      expect(getSwitch()).not.toBeChecked();
    });

    test.each([
      ['untouched', false, 0],
      ['turned on', true, 1],
    ])('submits %s switch as %s', async (_, expected, clicks) => {
      renderPage();

      await fillRequiredFields();
      for (let i = 0; i < clicks; i++) {
        await userEvent.click(getSwitch());
      }
      await submit();

      expect(mockCreatePet).toHaveBeenCalledTimes(1);
      expect(mockCreatePet.mock.calls[0][0]).toMatchObject({
        spayedNeutered: expected,
      });
    });
  });

  describe('arrival date', () => {
    beforeEach(() => {
      // Real timers keep running so userEvent doesn't hang
      jest.useFakeTimers({ advanceTimers: true });
      jest.setSystemTime(new Date(2026, 10, 15)); // 15 November 2026
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('years go from the current year back 30', () => {
      renderPage();

      const years = within(getArrivalYear())
        .getAllByRole('option')
        .map(option => option.getAttribute('value'))
        .filter(Boolean);

      expect(years).toHaveLength(31);
      expect(years[0]).toBe('2026');
      expect(years[30]).toBe('1996');
    });

    test('only month or only year shows the incomplete error', async () => {
      renderPage();

      await userEvent.selectOptions(getArrivalMonth(), '5');
      await submit();

      expect(await screen.findByText(ARRIVAL_INCOMPLETE)).toBeInTheDocument();
      expect(getArrivalMonth()).toHaveAttribute('aria-invalid', 'true');
      expect(getArrivalYear()).toHaveAttribute('aria-invalid', 'true');
    });

    test('choosing the missing part clears the error', async () => {
      renderPage();

      await userEvent.selectOptions(getArrivalYear(), '2025');
      await submit();
      expect(await screen.findByText(ARRIVAL_INCOMPLETE)).toBeInTheDocument();

      await userEvent.selectOptions(getArrivalMonth(), '5');

      expect(screen.queryByText(ARRIVAL_INCOMPLETE)).not.toBeInTheDocument();
      expect(getArrivalMonth()).toHaveAttribute('aria-invalid', 'false');
      expect(getArrivalYear()).toHaveAttribute('aria-invalid', 'false');
    });

    test('a month later than now shows the future error', async () => {
      renderPage();

      await userEvent.selectOptions(getArrivalMonth(), '12');
      await userEvent.selectOptions(getArrivalYear(), '2026');
      await submit();

      expect(await screen.findByText(ARRIVAL_FUTURE)).toBeInTheDocument();
    });

    test('current month submits arrival as numbers', async () => {
      renderPage();

      await fillRequiredFields();
      await userEvent.selectOptions(getArrivalMonth(), '11');
      await userEvent.selectOptions(getArrivalYear(), '2026');
      await submit();

      expect(mockCreatePet).toHaveBeenCalledTimes(1);
      expect(mockCreatePet.mock.calls[0][0]).toMatchObject({
        arrivalMonth: 11,
        arrivalYear: 2026,
      });
    });
  });

  describe('submit', () => {
    const getSubmitButton = () =>
      screen.getByRole('button', { name: 'shelter.pages.addPet.submit' });

    test('sends birth date instead of age', async () => {
      jest.useFakeTimers({ advanceTimers: true });
      jest.setSystemTime(new Date(2026, 10, 15)); // 15 November 2026
      renderPage();

      await fillRequiredFields(); // age: 3 years
      await submit();

      const payload = mockCreatePet.mock.calls[0][0];
      expect(payload).toMatchObject({ birthYear: 2023, birthMonth: 11 });
      expect(payload).not.toHaveProperty('ageValue');
      expect(payload).not.toHaveProperty('ageUnit');
      jest.useRealTimers();
    });

    test('leaves out empty breed and adoption conditions', async () => {
      renderPage();

      await fillRequiredFields();
      await submit();

      const payload = mockCreatePet.mock.calls[0][0];
      expect(payload.breed).toBeUndefined();
      expect(payload.adoptionConditions).toBeUndefined();
    });

    test('sends breed when it is filled in', async () => {
      renderPage();

      await fillRequiredFields();
      await userEvent.type(
        screen.getByLabelText('shelter.pages.addPet.fields.breed'),
        'Siamese'
      );
      await submit();

      expect(mockCreatePet.mock.calls[0][0]).toMatchObject({
        breed: 'Siamese',
      });
    });

    test('shows an error and keeps the form when saving fails', async () => {
      mockCreatePet.mockRejectedValueOnce(new Error('Network error'));
      renderPage();

      await fillRequiredFields();
      await submit();

      expect(await screen.findByRole('alert')).toHaveTextContent(
        'errors.serverError'
      );
      expect(getNameInput()).toHaveValue('Murka');
    });

    test('disables the save button while saving', async () => {
      mockCreatePet.mockReturnValueOnce(new Promise(() => {}));
      renderPage();

      await fillRequiredFields();
      expect(getSubmitButton()).toBeEnabled();
      await submit();

      expect(getSubmitButton()).toBeDisabled();
    });
  });
});
