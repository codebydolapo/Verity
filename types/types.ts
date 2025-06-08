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

// src/types.ts

// ... (keep your BestsellerProduct and BestsellersApiResponse interfaces)

// --- UPDATED New Types for Search Results ---

/**
 * Defines the shape of a single product item from the search API response.
 * THIS IS THE PART THAT NEEDS TO BE ACCURATE BASED ON YOUR REAL API RESPONSE.
 */
export interface SearchProduct {
  asin: string;
  product_asin: string;
  product_title: string;
  product_price: string;
  product_photo: string;
  price?: { // Price is often an object with structured details
    symbol?: string; // e.g., "$"
    value?: number; // e.g., 299.99
    currency?: string; // e.g., "USD"
    raw?: string; // e.g., "$299.99" - useful for direct display
  };
  // Alternative if price is a simple string directly on the product object:
  // product_price?: string;

  rating?: number; // Numerical star rating (e.g., 4.5)
  ratings_total?: number; // Total number of ratings/reviews
  is_prime?: boolean; // Whether it's a Prime eligible item
  // Add other properties you might see and use, e.g.:
  // category?: string;
  // brand?: string;
  // deal_of_the_day?: boolean;
  // sponsored?: boolean;
  // availability_status?: string;
}

/**
 * Defines the overall structure of the API response for the search endpoint.
 * This directly corresponds to the root object in your schema.
 */
export interface SearchApiResponse {
  status: string;
  request_id: string;
  parameters: { // Added based on your provided schema
    query: string;
    country: string;
    sort_by: string;
    page: number;
    is_prime: boolean;
  };
  data: {
    total_products: number; // This is the total number of results found
    country: string;
    domain: string;
    products: SearchProduct[]; // Now explicitly an array of SearchProduct
  };
}

/**
 * Defines the structure of the 'product_information' object.
 * This is a dynamic object with varying keys, so we'll use an index signature.
 */
export interface ProductInformation {
  // [key: string]: string; // Allows for any string key with a string value
  // key?: string;
  asin: string;
  product_title: string;
  product_price: string;
  product_original_price: string; // explicitly null based on schema
  product_price_max: string;
  currency: string;
  country: string;
  product_byline: string;
  product_byline_link: string;
  product_star_rating: string;
  product_num_ratings: number | string;
  product_url: string;
  product_slug: string;
  product_photo: string;
  product_availability: string;
  is_best_seller: boolean;
  is_amazon_choice: boolean;
  is_prime: boolean;
  climate_pledge_friendly: boolean;
  sales_volume: string;
  about_product: string[];
  product_description: string;
  product_information: {
    "Product Dimensions": string;
    "Item Weight": string;
    "ASIN": string;
    "Item model number": string;
    "B07ZPJWGKZ": {
      size: string;
      color: string;
      service_provider: string;
      product_grade: string;
    };
  };
  has_aplus: boolean;
  has_brandstory: boolean;
}

export interface ProductDetailsApiResponse {
  status: string;
  request_id: string;
  parameters: {
    asin: string;
    country: string;
  };
  data: ProductInformation; // This will hold the actual product details
}