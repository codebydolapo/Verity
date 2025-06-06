// src/hooks/useProductDetails.ts
import { useState, useEffect } from 'react';
import { fetchProductDetails } from '../lib/fetchProducts'; // Adjust path
import { ProductInformation } from '../types/types'; // Import the specific data type

interface UseProductDetailsResult {
  product: ProductInformation | null;
  loading: boolean;
  error: string | null;
}

const PRODUCT_DETAILS_CACHE_KEY_PREFIX = 'cachedProductDetails_'; // Prefix for dynamic cache keys

export function useProductDetails(asin: string | null): UseProductDetailsResult {
  const [product, setProduct] = useState<ProductInformation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Create a unique cache key based on the ASIN
  const cacheKey = `${PRODUCT_DETAILS_CACHE_KEY_PREFIX}${asin}`;

  useEffect(() => {
    // Prevent fetching if ASIN is null or empty
    if (!asin) {
      setProduct(null);
      setLoading(false);
      setError("No ASIN provided.");
      return;
    }

    const loadProductDetails = async () => {
      // 1. Check sessionStorage for cached data
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        try {
          const parsedProduct: ProductInformation = JSON.parse(cachedData);
          setProduct(parsedProduct);
          setLoading(false);
          console.log(`Using cached product details for ASIN: ${asin}.`);
          return; // Exit, no API call needed
        } catch (e) {
          console.warn(`Error parsing cached product details for ASIN ${asin}, refetching...`, e);
          sessionStorage.removeItem(cacheKey); // Clear invalid cache
        }
      }

      // 2. If no cached data or parsing failed, fetch from API
      console.log(`Fetching new product details for ASIN: ${asin} from API...`);
      setLoading(true);
      setError(null); // Clear previous errors

      try {
        const response = await fetchProductDetails(asin);
        if (response && response.data) {
          setProduct(response.data);
          // 3. Cache the new data
          sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
        } else {
          setProduct(null);
          setError(`No product details found for ASIN: ${asin} or API response structure unexpected.`);
        }
      } catch (err) {
        let errorMessage = "An unknown error occurred.";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(`Failed to fetch product details for ASIN ${asin}: ${errorMessage}`);
        setProduct(null); // Ensure product is null on error
      } finally {
        setLoading(false); // Always set loading to false in the end
      }
    };

    loadProductDetails();
  }, [asin, cacheKey]); // Re-run effect if ASIN changes

  return { product, loading, error };
}