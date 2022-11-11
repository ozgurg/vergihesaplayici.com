/**
 * @param {string} string
 * @returns {string}
 */
const getDomainFromUrl = string => new URL(string).hostname.replace("www.", "");

export {
    getDomainFromUrl
};
