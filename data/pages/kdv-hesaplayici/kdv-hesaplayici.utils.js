import { numberFormat } from "@/utils/formatter.js";

/**
 * Decides whether to show the calculator results or not.
 * It doesn't validate the inputs. They must be validated before it can be used.
 *
 * @param {Object<*, *>} form
 * @returns {boolean}
 */
const shouldShowResults = form => {
    return form.price > 0;
};

/**
 * @param {Object<*, *>} query
 * @param {object} requirements
 * @param {object[]} requirements.modeOptions
 * @returns {{price: number, currency: string}|void}
 */
const handleQuery = (query, { modeOptions }) => {
    const form = {};

    if (!query) return;

    if (query.price && query.price > 0) {
        form.price = parseFloat(query.price);
    }

    if (query.mode && modeOptions.some(object => object.value === query.mode)) {
        form.mode = query.mode;
    }

    return form;
};

/**
 * @param {Object<string, Object<string, number>>} results
 * @returns {Object<{key: string, value: string}>[]}
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
