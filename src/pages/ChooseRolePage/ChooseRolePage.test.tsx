import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChooseRolePage from './ChooseRolePage';
import { useAuth } from '../../context/useAuth';
import { chooseRole, LoginResponse } from '../../services/auth';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../components/Icon/Icon', () => ({
  Icon: ({ id, className }: { id: string; className?: string }) => (
    <svg data-testid={id} className={className} />
  ),
}));

jest.mock('../../context/useAuth');
jest.mock('../../services/auth');
const mockChooseRole = chooseRole as jest.MockedFunction<typeof chooseRole>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockLogout = jest.fn();

const getAdopterOption = () =>
  screen.getByRole('radio', { name: /chooseRole\.options\.USER\.title/ });

const getShelterOption = () =>
  screen.getByRole('radio', { name: /chooseRole\.options\.SHELTER\.title/ });

const getContinueButton = () =>
  screen.getByRole('button', { name: 'chooseRole.continue' });

const response: LoginResponse = {
  accessToken: 'token',
  refreshToken: 'refresh',
  expiresIn: 86400000,
  userInfo: {
    id: 1,
    email: 'new@example.com',
    firstName: '',
    lastName: '',
    profileImageUrl: null,
    location: '',
    role: 'ROLE_USER',
  },
};

describe('ChooseRolePage', () => {
  beforeEach(() => {
    mockLogout.mockClear();
    mockChooseRole.mockReset();
    mockChooseRole.mockResolvedValue(response);
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

    expect(
      screen.getByRole('group', { name: 'chooseRole.title' })
    ).toContainElement(getAdopterOption());
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
      screen.getByRole('button', { name: 'chooseRole.logout' })
    );

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  describe('continue', () => {
    test.each([
      ['USER', getAdopterOption],
      ['SHELTER', getShelterOption],
    ] as const)('sends %s', async (role, getOption) => {
      render(<ChooseRolePage />);

      await userEvent.click(getOption());
      await userEvent.click(getContinueButton());

      expect(mockChooseRole).toHaveBeenCalledWith(role);
    });

    test('choosing an option does not send it', async () => {
      render(<ChooseRolePage />);

      await userEvent.click(getShelterOption());

      expect(mockChooseRole).not.toHaveBeenCalled();
    });

    test('locks the button and options while saving', async () => {
      let finish: (value: LoginResponse) => void = () => {};
      mockChooseRole.mockReturnValueOnce(
        new Promise(resolve => {
          finish = resolve;
        })
      );
      render(<ChooseRolePage />);

      await userEvent.click(getShelterOption());
      await userEvent.click(getContinueButton());

      expect(getContinueButton()).toBeDisabled();
      expect(getAdopterOption()).toBeDisabled();
      expect(getShelterOption()).toBeDisabled();

      finish(response);
      await waitFor(() => expect(getContinueButton()).toBeEnabled());
    });

    test('shows an error when saving fails and unlocks the form', async () => {
      mockChooseRole.mockRejectedValueOnce(new Error('Network error'));
      render(<ChooseRolePage />);

      await userEvent.click(getShelterOption());
      await userEvent.click(getContinueButton());

      expect(await screen.findByRole('alert')).toHaveTextContent(
        'errors.serverError'
      );
      expect(getContinueButton()).toBeEnabled();
      expect(getShelterOption()).toBeEnabled();
    });

    test('retry sends again and hides the error', async () => {
      mockChooseRole.mockRejectedValueOnce(new Error('Network error'));
      render(<ChooseRolePage />);

      await userEvent.click(getShelterOption());
      await userEvent.click(getContinueButton());
      await screen.findByRole('alert');

      await userEvent.click(getContinueButton());

      await waitFor(() =>
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      );
      expect(mockChooseRole).toHaveBeenCalledTimes(2);
    });
  });
});
