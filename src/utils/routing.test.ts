import { getPostLoginPath } from './routing';

describe('getPostLoginPath', () => {
  test.each([
    ['ROLE_SHELTER_OWNER', '/shelter/profile'],
    ['ROLE_USER', '/account'],
    [undefined, '/choose-role'],
  ] as const)('%s → %s', (role, path) => {
    expect(getPostLoginPath(role)).toBe(path);
  });
});
