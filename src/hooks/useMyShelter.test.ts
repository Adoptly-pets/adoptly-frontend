import { renderHook, waitFor } from '@testing-library/react';
import useMyShelter from './useMyShelter';
import { getMyShelter, type ShelterResponse } from '../services/shelter';

jest.mock('../services/shelter', () => ({
  getMyShelter: jest.fn(),
}));

const mockedGetMyShelter = getMyShelter as jest.MockedFunction<
  typeof getMyShelter
>;

// Only the fields the hook passes through
const shelter = { id: 7, slug: 'happy-paws' } as ShelterResponse;

describe('useMyShelter', () => {
  beforeEach(() => {
    mockedGetMyShelter.mockReset();
  });

  test('is loading until the request finishes', () => {
    mockedGetMyShelter.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useMyShelter());

    expect(result.current).toEqual({ status: 'loading' });
  });

  test('returns the saved shelter', async () => {
    mockedGetMyShelter.mockResolvedValue(shelter);

    const { result } = renderHook(() => useMyShelter());

    await waitFor(() =>
      expect(result.current).toEqual({ status: 'loaded', shelter })
    );
  });

  test('returns null when the user has no shelter yet', async () => {
    mockedGetMyShelter.mockResolvedValue(null);

    const { result } = renderHook(() => useMyShelter());

    await waitFor(() =>
      expect(result.current).toEqual({ status: 'loaded', shelter: null })
    );
  });

  test('returns an error when the request fails', async () => {
    mockedGetMyShelter.mockRejectedValue({ type: 'network', message: '' });

    const { result } = renderHook(() => useMyShelter());

    await waitFor(() => expect(result.current).toEqual({ status: 'error' }));
  });

  test('requests the shelter once', async () => {
    mockedGetMyShelter.mockResolvedValue(shelter);

    const { result, rerender } = renderHook(() => useMyShelter());
    await waitFor(() => expect(result.current.status).toBe('loaded'));
    rerender();

    expect(mockedGetMyShelter).toHaveBeenCalledTimes(1);
  });
});
