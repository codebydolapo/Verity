// src/types.ts (or interfaces.ts)

/**
 * Defines the shape of a single bestseller product item as returned by the RapidAPI best-sellers endpoint.
 * This directly corresponds to the 'items' object within the 'best_sellers' array in your schema.
 */
export interface BestsellerProduct {
  rank: number;
  asin: string;
  product_title: string;
  product_price: string; // Price is a string (e.g., "$29.99")
  product_star_rating?: string; // Optional: Rating can be a string (e.g., "4.5 out of 5 stars")
  product_num_ratings?: number; // Optional: Number of ratings
  product_url: string;
  product_photo: string;
  rank_change_label?: string; // Optional: Label indicating rank change
}

/**
 * Defines the overall structure of the API response for the best-sellers endpoint.
 * This directly corresponds to the root object in your schema.
 */
export interface BestsellersApiResponse {
  status: string;
  request_id: string;
  data: {
    best_sellers: BestsellerProduct[]; // The array of bestseller products
    country: string;
    domain: string;
  };
}