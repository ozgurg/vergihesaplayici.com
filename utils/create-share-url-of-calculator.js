import { objectToQueryString } from "@/utils/object-to-query-string.js";
import { getFullUrl } from "@/utils/get-full-url.js";

/**
 * @param {string} calculatorPath
 * @param {object} params
 * @param {boolean} willIncludeParams
 * @returns {string}
 */
const createShareUrlOfCalculator = (calculatorPath, params, willIncludeParams) => {
    const urlWithCalculatorPath = getFullUrl(calculatorPath);
    return willIncludeParams ? `${urlWithCalculatorPath}?${objectToQueryString(params)}` : urlWithCalculatorPath;
};

export {
    createShareUrlOfCalculator
};
