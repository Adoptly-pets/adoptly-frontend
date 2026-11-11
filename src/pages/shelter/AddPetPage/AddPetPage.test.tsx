import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AddPetPage from './AddPetPage';

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

describe('AddPetPage', () => {
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
      await userEvent.selectOptions(
        screen.getByRole('combobox', {
          name: /shelter\.pages\.addPet\.fields\.species/,
        }),
        'DOG'
      );
      await userEvent.click(
        screen.getByRole('radio', {
          name: 'shelter.pages.addPet.options.gender.MALE',
        })
      );
      await userEvent.type(getAgeInput(), '2');
      await userEvent.type(getDescription(), 'Friendly dog');
      await submit();

      for (const error of ERRORS) {
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
});
