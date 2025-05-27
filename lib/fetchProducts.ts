// Consider creating a separate file for API constants (e.g., `apiConfig.ts`)
const API_BASE_URL = 'https://real-time-amazon-data.p.rapidapi.com';
const API_HOST = 'real-time-amazon-data.p.rapidapi.com';

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;



export async function fetchSearch(searchParameter: string) {

    if (!RAPIDAPI_KEY) {
        console.error("RapidAPI key is not defined. Please set NEXT_PUBLIC_RAPIDAPI_KEY environment variable.");
        return null;
    }

    const url = new URL(`${API_BASE_URL}/search`);
    url.searchParams.append('query', searchParameter);
    url.searchParams.append('page', '1');
    url.searchParams.append('country', 'US');
    url.searchParams.append('sort_by', 'RELEVANCE');
    url.searchParams.append('product_condition', 'ALL');
    url.searchParams.append('is_prime', 'false');
    url.searchParams.append('deals_and_discounts', 'NONE');

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            // Handle HTTP errors (e.g., 404, 500)
            const errorData = await response.json(); // Attempt to parse error message
            console.error(`API Error: ${response.status} ${response.statusText}`, errorData);
            return null;
        }

        const result = await response.json(); // Parse as JSON, not text
        return result;

    } catch (error) {
        if (error instanceof Error) {
            console.error("Failed to fetch bestsellers:", error.message);
        } else {
            console.error("An unknown error occurred while fetching bestsellers:", error);
        }
        return null;
    }
}



/*search parameters for this is the category within which to search*/
export async function fetchBestsellers(searchParameter: string) {
    if (!RAPIDAPI_KEY) {
        console.error("RapidAPI key is not defined. Please set NEXT_PUBLIC_RAPIDAPI_KEY environment variable.");
        return null;
    }

    const url = new URL(`${API_BASE_URL}/best-sellers`);
    url.searchParams.append('category', searchParameter);
    url.searchParams.append('type', 'BEST_SELLERS');
    url.searchParams.append('page', '1');
    url.searchParams.append('country', 'US');
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            // Handle HTTP errors (e.g., 404, 500)
            const errorData = await response.json(); // Attempt to parse error message
            console.error(`API Error: ${response.status} ${response.statusText}`, errorData);
            return null;
        }

        const result = await response.json(); // Parse as JSON, not text
        console.log("fetched results", result.data.best_sellers)
        return result;

    } catch (error) {

        if (error instanceof Error) {
            console.error("Failed to fetch bestsellers:", error.message);
        } else {
            console.error("An unknown error occurred while fetching bestsellers:", error);
        }
        return null;

    }
}