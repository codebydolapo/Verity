// src/hooks/useSearchResults.ts
import { useState, useEffect } from 'react';
import { fetchSearchResults } from '../lib/fetchProducts'; // Adjust path
import { SearchProduct, SearchApiResponse } from '../types/types'; // Import both SearchProduct and SearchApiResponse types

interface UseSearchResultsResult {
  data: SearchProduct[];
  loading: boolean;
  error: string | null;
  totalResults: number | null; // Added to return total results
}

const SEARCH_CACHE_KEY_PREFIX = 'cachedSearchResults_'; // Prefix for dynamic cache keys

export function useSearchResults(query: string, page: number = 1): UseSearchResultsResult {
  const [data, setData] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number | null>(null);

  // Create a unique cache key based on the query and page
  const cacheKey = `${SEARCH_CACHE_KEY_PREFIX}${query.toLowerCase().replace(/\s+/g, '_')}_page_${page}`;

  useEffect(() => {
    // Prevent fetching if query is empty (e.g., initial render before user types)
    if (!query) {
      setData([]);
      setLoading(false);
      setError(null);
      setTotalResults(0);
      return;
    }

    const loadSearchResults = async () => {
      // 1. Check sessionStorage for cached data
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        try {
          const { products, total } = JSON.parse(cachedData);
          setData(products);
          setTotalResults(total);
          setLoading(false);
          console.log(`Using cached search data for "${query}" (page ${page}).`);
    console.log("hello this is from a search cache")

          return; // Exit, no API call needed
        } catch (e) {
          console.warn(`Error parsing cached search data for "${query}", refetching...`, e);
          sessionStorage.removeItem(cacheKey); // Clear invalid cache
        }
      }

      // 2. If no cached data or parsing failed, fetch from API
      console.log(`Fetching new search results for "${query}" (page ${page}) from API...`);
      setLoading(true);
      setError(null); // Clear previous errors
      setTotalResults(null); // Reset total results while loading

      try {
        const response: SearchApiResponse | null = await fetchSearchResults(query, page); // Explicitly type response

        // Adjust this condition and data path based on your actual API response
        if (response && response.data && response.data.products) {
          const products = response.data.products;
          setData(products);

          // *** THE CHANGE IS HERE ***
          setTotalResults(response.data.total_products || products.length); // Use total_products from schema
          // 3. Cache the new data, including total results
          sessionStorage.setItem(cacheKey, JSON.stringify({ products, total: response.data.total_products })); // Use total_products from schema
          console.log(response.data.total_products)
    console.log("hello this is from a search data fetch")

        } else {
          setData([]); // No products found
          setError(`No search results found for "${query}" or API response structure unexpected.`);
          setTotalResults(0);
        }
      } catch (err) {
        let errorMessage = "An unknown error occurred.";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(`Failed to fetch search results for "${query}": ${errorMessage}`);
        setData([]); // Ensure products array is empty on error
        setTotalResults(0);
      } finally {
        setLoading(false); // Always set loading to false in the end
      }
    };

    loadSearchResults();
  }, [query, page, cacheKey]); // Re-run effect if query or page changes

  return { data, loading, error, totalResults };
}