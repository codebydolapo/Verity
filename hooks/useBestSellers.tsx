// hooks/useBestsellers.ts
import { useState, useEffect } from 'react';
import { fetchBestsellers } from '../lib/fetchProducts'; // Adjust path as necessary
import { BestsellerProduct, BestsellersApiResponse } from '@/types/types'; // Import your types

interface UseBestsellersResult {
  data: BestsellerProduct[];
  loading: boolean;
  error: string | null;
}

const CACHE_KEY_PREFIX = 'cachedBestsellers_'; // Prefix for dynamic cache keys

export function useBestsellers(category: string): UseBestsellersResult {
  const [data, setData] = useState<BestsellerProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = `${CACHE_KEY_PREFIX}${category}`; // Dynamic cache key

  useEffect(() => {
    const loadBestsellers = async () => {
      // 1. Check sessionStorage for cached data
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        try {
          const products: BestsellerProduct[] = JSON.parse(cachedData);
          setData(products);
          setLoading(false);
          console.log(`Using cached data for ${category} bestsellers.`);
          return; // Exit, no API call needed
        } catch (e) {
          console.warn(`Error parsing cached data for ${category}, refetching...`, e);
          sessionStorage.removeItem(cacheKey); // Clear invalid cache
        }
      }

      // 2. If no cached data or parsing failed, fetch from API
      console.log(`Workspaceing new ${category} bestsellers data from API...`);
      setLoading(true);
      setError(null); // Clear previous errors

      try {
        const response = await fetchBestsellers(category);
        if (response && response.data && response.data.best_sellers) {
          const products = response.data.best_sellers;
          setData(products);
          // 3. Cache the new data
          sessionStorage.setItem(cacheKey, JSON.stringify(products));
        } else {
          setData([]); // No products found
          setError(`No ${category} bestsellers found or API response structure unexpected.`);
        }
      } catch (err) {
        let errorMessage = "An unknown error occurred.";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(`Failed to fetch ${category} bestsellers: ${errorMessage}`);
        setData([]); // Ensure products array is empty on error
      } finally {
        setLoading(false); // Always set loading to false in the end
      }
    };

    loadBestsellers();
  }, [category, cacheKey]); // Re-run effect if category or cacheKey changes

  return { data, loading, error };
}