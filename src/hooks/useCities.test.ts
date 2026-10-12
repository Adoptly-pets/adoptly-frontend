import { renderHook, waitFor } from '@testing-library/react';
import { useCities } from './useCities';

describe('useCities', () => {
  test('returns empty state when regionSlug is null', () => {
    const { result } = renderHook(() => useCities(null));

    expect(result.current).toEqual({
      cities: [],
      loading: false,
      error: null,
    });
  });

  test('loads cities for a valid regionSlug', async () => {
    const { result } = renderHook(() => useCities('kyiv'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.cities).toEqual(['Київ']);
    expect(result.current.error).toBeNull();
  });

  test('reloads when regionSlug changes', async () => {
    const { result, rerender } = renderHook(
      ({ slug }: { slug: string | null }) => useCities(slug),
      { initialProps: { slug: 'kyiv' as string | null } }
    );

    await waitFor(() => expect(result.current.cities).toEqual(['Київ']));

    rerender({ slug: 'sevastopol' });

    await waitFor(() =>
      expect(result.current.cities).toEqual(['Севастополь'])
    );
  });

  test('clears state when regionSlug becomes null', async () => {
    const { result, rerender } = renderHook(
      ({ slug }: { slug: string | null }) => useCities(slug),
      { initialProps: { slug: 'kyiv' as string | null } }
    );

    await waitFor(() => expect(result.current.cities).toEqual(['Київ']));

    rerender({ slug: null });

    expect(result.current).toEqual({
      cities: [],
      loading: false,
      error: null,
    });
  });
});
