/**
 * @param {string} string
 * @returns {string}
 */
export const getDomainFromUrl = string => new URL(string).hostname.replace("www.", "");
