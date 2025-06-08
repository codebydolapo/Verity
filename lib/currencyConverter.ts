// lib/currencyConverter.ts

// Current approximate rate as of June 2025: 1 USD ≈ 1485 NGN
const USD_TO_NGN_EXCHANGE_RATE = 1485.00; 

interface ConvertedCurrency {
    usdFormatted: string;
    ngnFormatted: string;
    usdValue: number;
    ngnValue: number;
}

/**
 * Parses a dollar amount string and converts it to Nigerian Naira (NGN).
 *
 * @param dollarAmountString The input string representing a dollar amount (e.g., "$123.45", "1,234").
 * @returns An object containing formatted USD and NGN strings, and their numeric values.
 * Returns default zero values if parsing or conversion fails.
 */
export default function convertUsdToNgn(dollarAmountString: string | null | undefined): ConvertedCurrency {
    let parsedUsdValue: number;

    if (typeof dollarAmountString !== 'string' || !dollarAmountString.trim()) {
        parsedUsdValue = 0;
    } else {
        // Remove common currency symbols, commas, and trim whitespace
        const cleanString = dollarAmountString.replace(/[^0-9.-]+/g, "");
        parsedUsdValue = parseFloat(cleanString);

        // Handle cases where parsing results in NaN (e.g., "Free", "N/A")
        if (isNaN(parsedUsdValue)) {
            parsedUsdValue = 0;
        }
    }

    const ngnValue = parsedUsdValue * USD_TO_NGN_EXCHANGE_RATE;

    // Format USD and NGN values using Intl.NumberFormat for proper currency display
    const usdFormatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(parsedUsdValue);

    const ngnFormatted = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(ngnValue);

    return {
        usdFormatted,
        ngnFormatted,
        usdValue: parsedUsdValue,
        ngnValue,
    };
}