import { useEffect, useState } from 'react';

type UseCitiesResult = {
  cities: string[];
  loading: boolean;
  error: Error | null;
};

export const useCities = (regionSlug: string | null): UseCitiesResult => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!regionSlug) {
      setCities([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const load = async () => {
      try {
        const mod = await import(`../constants/cities/${regionSlug}.json`);
        if (cancelled) return;
        setCities(mod.default);
      } catch (err) {
        if (cancelled) return;
        setError(err as Error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();

    return () => {
      cancelled = true;
    };
  }, [regionSlug]);

  return { cities, loading, error };
};
