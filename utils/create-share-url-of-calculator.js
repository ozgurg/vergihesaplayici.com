import { objectToQueryString } from "@/utils/object-to-query-string";

/**
 * @param {{baseUrl: string, calculatorPath: string}} calculator
 * @param {object} params
 * @param {boolean} willIncludeParams
 * @return {string}
 */
const createShareUrlOfCalculator = ({
    baseUrl,
    calculatorPath
}, params, willIncludeParams) => {
    const urlWithCalculatorPath = `${baseUrl}${calculatorPath}`;
    return willIncludeParams ? `${urlWithCalculatorPath}?${objectToQueryString(params)}` : urlWithCalculatorPath;
};

export {
    createShareUrlOfCalculator
};
