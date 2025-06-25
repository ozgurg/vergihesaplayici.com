import { objectToQueryString } from "@/utils/object-to-query-string.js";
import { getFullUrl } from "@/utils/get-full-url.js";

/**
 * @param {string} path
 * @param {object} params
 * @param {boolean} includeParams
 * @returns {string}
 */
export const createShareUrlOfCalculator = (path, params, includeParams) => {
    const fullUrl = getFullUrl(path);
    return includeParams ?
        `${fullUrl}?${objectToQueryString(params)}` :
        fullUrl;
};
