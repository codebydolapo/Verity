/**
 * Truncates a string to a specified maximum length.
 * If the string is longer than maxLength, it truncates the string
 * and appends an ellipsis (...) or a custom suffix.
 *
 * @param str The input string to truncate.
 * @param maxLength The maximum length of the string before truncation.
 * @param suffix The string to append if truncation occurs (defaults to '...').
 * @returns The truncated string.
 */
function truncateString(str: string, maxLength: number, suffix: string = '...'): string {
    // Input validation: Ensure str is a string and maxLength is a non-negative number
    if (typeof str !== 'string') {
        console.warn('truncateString: Input `str` must be a string. Returning original input.');
        return str;
    }
    if (typeof maxLength !== 'number' || maxLength < 0) {
        console.warn('truncateString: Input `maxLength` must be a non-negative number. Returning original string.');
        return str;
    }
    if (typeof suffix !== 'string') {
        console.warn('truncateString: Input `suffix` must be a string. Using default suffix.');
        suffix = '...';
    }

    // If the string length is already less than or equal to maxLength, return it as is
    if (str.length <= maxLength) {
        return str;
    }

    // Calculate the actual truncation point, considering the length of the suffix
    const truncationLength = maxLength - suffix.length;

    // If maxLength is too small to even fit the suffix, just return the suffix itself
    // or handle as per specific requirement (e.g., return empty string or error)
    if (truncationLength < 0) {
        // This case means maxLength is so small it can't even hold the suffix.
        // You might decide to return the suffix itself, or an empty string,
        // or the first few characters up to maxLength.
        // For simplicity, let's return the string truncated to maxLength, ignoring suffix for this edge case.
        return str.substring(0, maxLength);
    }

    // Truncate the string and append the suffix
    return str.substring(0, truncationLength) + suffix;
}

export default truncateString