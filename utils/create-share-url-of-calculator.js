import { objectToQueryString } from "@/utils/object-to-query-string.js";
import { getFullUrl } from "@/utils/get-full-url.js";

/**
 * @param {string} calculatorPath
 * @param {object} params
 * @param {boolean} includeParams
 * @returns {string}
 */
const createShareUrlOfCalculator = (calculatorPath, params, includeParams) => {
    const urlWithCalculatorPath = getFullUrl(calculatorPath);
    return includeParams ? `${urlWithCalculatorPath}?${objectToQueryString(params)}` : urlWithCalculatorPath;
};

export {
    createShareUrlOfCalculator
};
