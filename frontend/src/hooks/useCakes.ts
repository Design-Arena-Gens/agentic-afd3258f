import { useEffect, useState } from 'react';
import { fetchCakes } from '@/lib/api';
import { Cake } from '@/types';

export const useCakes = (filters: Record<string, string | number | undefined>) => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchCakes(filters)
      .then(data => {
        setCakes(data);
        setError(null);
      })
      .catch(() => setError('Unable to load cakes right now.'))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  return { cakes, loading, error };
};

