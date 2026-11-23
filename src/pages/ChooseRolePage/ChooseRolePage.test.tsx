import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ChooseRolePage from './ChooseRolePage';
import { useAuth } from '../../context/useAuth';
import { chooseRole, LoginResponse } from '../../services/auth';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// langLink takes the language from the global i18n instance
jest.mock('i18next', () => ({
  __esModule: true,
  default: { language: 'en' },
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
const mockLogin = jest.fn();

const getAdopterOption = () =>
  screen.getByRole('radio', { name: /chooseRole\.options\.USER\.title/ });

const getShelterOption = () =>
  screen.getByRole('radio', { name: /chooseRole\.options\.SHELTER\.title/ });

const getContinueButton = () =>
  screen.getByRole('button', { name: 'chooseRole.continue' });

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/en/choose-role']}>
      <Routes>
        <Route path="/:lng/choose-role" element={<ChooseRolePage />} />
        <Route path="/:lng/login" element={<p>login page</p>} />
        <Route path="/:lng/account" element={<p>account page</p>} />
        <Route path="/:lng/shelter/profile" element={<p>shelter page</p>} />
      </Routes>
    </MemoryRouter>
  );

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
    mockLogin.mockClear();
    mockChooseRole.mockReset();
    mockChooseRole.mockResolvedValue(response);
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { ...response.userInfo, role: undefined },
      login: mockLogin,
      logout: mockLogout,
    });
  });

  test('shows both role options, none chosen', () => {
    renderPage();

    expect(getAdopterOption()).not.toBeChecked();
    expect(getShelterOption()).not.toBeChecked();
  });

  test('options are grouped under the page heading', () => {
    renderPage();

    expect(
      screen.getByRole('group', { name: 'chooseRole.title' })
    ).toContainElement(getAdopterOption());
  });

  test('continue is disabled until a role is chosen', async () => {
    renderPage();
    expect(getContinueButton()).toBeDisabled();

    await userEvent.click(getShelterOption());

    expect(getShelterOption()).toBeChecked();
    expect(getContinueButton()).toBeEnabled();
  });

  test('choosing another option switches the role', async () => {
    renderPage();

    await userEvent.click(getShelterOption());
    await userEvent.click(getAdopterOption());

    expect(getAdopterOption()).toBeChecked();
    expect(getShelterOption()).not.toBeChecked();
  });

  test('log out calls logout', async () => {
    renderPage();

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
      renderPage();

      await userEvent.click(getOption());
      await userEvent.click(getContinueButton());

      expect(mockChooseRole).toHaveBeenCalledWith(role);
    });

    test('choosing an option does not send it', async () => {
      renderPage();

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
      renderPage();

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
      renderPage();

      await userEvent.click(getShelterOption());
      await userEvent.click(getContinueButton());

      expect(await screen.findByRole('alert')).toHaveTextContent(
        'errors.serverError'
      );
      expect(getContinueButton()).toBeEnabled();
      expect(getShelterOption()).toBeEnabled();
    });

    test('shows a network error when there is no connection', async () => {
      mockChooseRole.mockRejectedValueOnce({
        type: 'network',
        message: 'Network error. Please check your connection.',
      });
      renderPage();

      await userEvent.click(getShelterOption());
      await userEvent.click(getContinueButton());

      expect(await screen.findByRole('alert')).toHaveTextContent(
        'errors.networkError'
      );
    });

    test('retry sends again and hides the error', async () => {
      mockChooseRole.mockRejectedValueOnce(new Error('Network error'));
      renderPage();

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

  describe('after saving', () => {
    test('replaces the session with the tokens and user from the response', async () => {
      renderPage();

      await userEvent.click(getAdopterOption());
      await userEvent.click(getContinueButton());

      await waitFor(() =>
        expect(mockLogin).toHaveBeenCalledWith(
          { accessToken: 'token', refreshToken: 'refresh' },
          response.userInfo
        )
      );
    });

    test('keeps the session when saving fails', async () => {
      mockChooseRole.mockRejectedValueOnce(new Error('Network error'));
      renderPage();

      await userEvent.click(getAdopterOption());
      await userEvent.click(getContinueButton());
      await screen.findByRole('alert');

      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  describe('redirects', () => {
    const mockUser = (user: LoginResponse['userInfo'] | null) =>
      mockUseAuth.mockReturnValue({
        isAuthenticated: user !== null,
        user,
        login: mockLogin,
        logout: mockLogout,
      });

    test('a guest goes to login', () => {
      mockUser(null);

      renderPage();

      expect(screen.getByText('login page')).toBeInTheDocument();
    });

    test.each([
      ['ROLE_USER', 'account page'],
      ['ROLE_SHELTER_OWNER', 'shelter page'],
    ] as const)('a user with %s goes to their cabinet', (role, page) => {
      mockUser({ ...response.userInfo, role });

      renderPage();

      expect(screen.getByText(page)).toBeInTheDocument();
      expect(
        screen.queryByRole('heading', { name: 'chooseRole.title' })
      ).not.toBeInTheDocument();
    });
  });
});
