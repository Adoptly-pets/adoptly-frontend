import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChooseRolePage from './ChooseRolePage';
import { useAuth } from '../../context/useAuth';

jest.mock('../../components/Icon/Icon', () => ({
  Icon: ({ id, className }: { id: string; className?: string }) => (
    <svg data-testid={id} className={className} />
  ),
}));

jest.mock('../../context/useAuth');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockLogout = jest.fn();

const getAdopterOption = () =>
  screen.getByRole('radio', { name: /Я хочу взяти тварину/ });

const getShelterOption = () =>
  screen.getByRole('radio', { name: /Я представляю притулок/ });

const getContinueButton = () =>
  screen.getByRole('button', { name: 'Продовжити' });

describe('ChooseRolePage', () => {
  beforeEach(() => {
    mockLogout.mockClear();
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: null,
      login: jest.fn(),
      logout: mockLogout,
    });
  });

  test('shows both role options, none chosen', () => {
    render(<ChooseRolePage />);

    expect(getAdopterOption()).not.toBeChecked();
    expect(getShelterOption()).not.toBeChecked();
  });

  test('options are grouped under the page heading', () => {
    render(<ChooseRolePage />);

    expect(screen.getByRole('group', { name: /Adoptly/ })).toContainElement(
      getAdopterOption()
    );
  });

  test('continue is disabled until a role is chosen', async () => {
    render(<ChooseRolePage />);
    expect(getContinueButton()).toBeDisabled();

    await userEvent.click(getShelterOption());

    expect(getShelterOption()).toBeChecked();
    expect(getContinueButton()).toBeEnabled();
  });

  test('choosing another option switches the role', async () => {
    render(<ChooseRolePage />);

    await userEvent.click(getShelterOption());
    await userEvent.click(getAdopterOption());

    expect(getAdopterOption()).toBeChecked();
    expect(getShelterOption()).not.toBeChecked();
  });

  test('log out calls logout', async () => {
    render(<ChooseRolePage />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Вийти з акаунта' })
    );

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
