import { useState, useCallback } from 'react';

export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const withLoading = useCallback(async <T,>(callback: () => Promise<T>): Promise<T> => {
    setIsLoading(true);
    try {
      const result = await callback();
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, withLoading };
};