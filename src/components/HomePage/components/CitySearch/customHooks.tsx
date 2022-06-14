import { useState, useCallback, useEffect } from 'react';
import { CitiesJSONData } from './types';

/**
 * Custom hook to load JSON cities files using dynamic imports.
 */
export const useCitiesJSONData = () => {
  const [citiesData, setCitiesData] = useState<CitiesJSONData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadJSONData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const citiesJSONData = await import('../../../../data/cities-min-data.json');
      const neighboringJSONData = await import('../../../../data/cities-neighboring-data.json');
      setCitiesData({ cities: citiesJSONData.default, neighboring: neighboringJSONData.default });
    } catch (err) {
      setError('Error loading Cities JSON data');
      console.error('Error loading Cities JSON data', err);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadJSONData();
  }, [loadJSONData]);

  return {
    citiesData,
    isLoading,
    error,
  };
}
