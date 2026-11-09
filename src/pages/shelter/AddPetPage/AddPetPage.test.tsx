import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddPetPage from './AddPetPage';

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
});
