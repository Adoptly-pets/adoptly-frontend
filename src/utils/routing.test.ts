import { getPostLoginPath } from './routing';
import type { Role } from '../services/auth';

describe('getPostLoginPath', () => {
  test.each([
    ['ROLE_SHELTER_OWNER', '/shelter/profile'],
    ['ROLE_USER', '/account'],
    [undefined, '/choose-role'],
  ] as const)('%s → %s', (role, path) => {
    expect(getPostLoginPath(role)).toBe(path);
  });

  test('sends a role the app does not know to the home page', () => {
    expect(getPostLoginPath('ROLE_ADMIN' as Role)).toBe('/');
  });
});
