import objectToQueryString from "@/utils/object-to-query-string";

const createShareUrlOfCalculator = ({
    baseUrl,
    calculatorPath
}, params, willIncludeParams) => {
    const urlWithCalculatorPath = `${baseUrl}${calculatorPath}`;
    return willIncludeParams ? `${urlWithCalculatorPath}?${objectToQueryString(params)}` : urlWithCalculatorPath;
};

export default createShareUrlOfCalculator;
