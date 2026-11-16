import { ageToBirthDate } from './ageToBirthDate';

describe('ageToBirthDate', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test.each([
    ['2 years in November 2026', new Date(2026, 10, 15), 2, 'YEARS', 2024, 11],
    ['3 months across the year', new Date(2026, 1, 15), 3, 'MONTHS', 2025, 11],
    ['0 months in January', new Date(2026, 0, 15), 0, 'MONTHS', 2026, 1],
    ['1 year in January', new Date(2026, 0, 15), 1, 'YEARS', 2025, 1],
  ] as const)('%s', (_, today, ageValue, ageUnit, birthYear, birthMonth) => {
    jest.setSystemTime(today);

    expect(ageToBirthDate(ageValue, ageUnit)).toEqual({
      birthYear,
      birthMonth,
    });
  });
});
