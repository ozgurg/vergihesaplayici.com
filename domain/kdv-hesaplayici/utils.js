import { numberFormat } from "@/utils/formatter.js";

/**
 * Decides whether to show the calculator results or not.
 * It doesn't validate the inputs. They must be validated before it can be used.
 *
 * @param {{[key: string]: *}} form
 * @returns {boolean}
 */
const shouldShowResults = form => {
    return form.price > 0 &&
        form.rate > 0;
};

/**
 * @param {{[key: string]: *}} query
 * @param {object} requirements
 * @param {{title: string, value: string}[]} requirements.modeOptions
 * @returns {{price: number, mode: string}|void}
 */
const handleQuery = (query, { modeOptions }) => {
    const form = {};

    if (!query) return;

    if (query.mode && modeOptions.some(object => object.value === query.mode)) {
        form.mode = query.mode;
    }

    if (query.price && query.price > 0) {
        form.price = parseFloat(query.price);
    }

    if (query.rate && query.rate > 0) {
        form.rate = parseFloat(query.rate);
    }

    return form;
};

/**
 * @param {{[key: string]: {[key: string]: number}}} results
 * @returns {{key: string, value: string}[]}
 */
const buildResultList = results => {
    return [
        {
            key: "KDV hariç fiyat",
            value: numberFormat(results.prices.taxFree)
        },
        {
            key: `KDV (%${results.taxRates.valueAddedTax})`,
            value: numberFormat(results.taxFees.valueAddedTax)
        },
        {
            key: "KDV dahil fiyat",
            value: numberFormat(results.prices.taxAdded)
        }
    ];
};

export {
    shouldShowResults,
    handleQuery,
    buildResultList
};
