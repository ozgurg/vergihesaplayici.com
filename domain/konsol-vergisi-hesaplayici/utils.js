import { isCurrencyAvailable } from "@/utils/is-currency-available.js";
import { moneyFormat } from "@/utils/formatter.js";

/**
 * Decides whether to show the calculator results or not.
 * It doesn't validate the inputs. They must be validated before it can be used.
 *
 * @param {{[key: string]: *}} form
 * @returns {boolean}
 */
const shouldShowResults = form => {
    return form.price > 0 &&
        form.currency !== "";
};

/**
 * @param {{[key: string]: *}} query
 * @param {object} requirements
 * @param {string[]} requirements.availableCurrencies
 * @returns {{price: number, currency: string}|void}
 */
const handleQuery = (query, { availableCurrencies }) => {
    const form = {};

    if (!query) return;

    if (query.price && query.price > 0) {
        form.price = parseFloat(query.price);
    }

    if (query.currency && isCurrencyAvailable(query.currency, availableCurrencies)) {
        form.currency = query.currency;
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
            key: "Vergisiz fiyat",
            value: moneyFormat(results.prices.taxFree, "TRY")
        },
        {
            key: `Gümrük vergisi (%${results.taxRates.customTax})`,
            value: moneyFormat(results.taxFees.customTax, "TRY")
        },
        {
            key: `ÖTV (%${results.taxRates.specialConsumptionTax})`,
            value: moneyFormat(results.taxFees.specialConsumptionTax, "TRY")
        },
        {
            key: `KDV (%${results.taxRates.valueAddedTax})`,
            value: moneyFormat(results.taxFees.valueAddedTax, "TRY")
        },
        {
            key: `Toplam vergi (%${results.taxRates.total})`,
            value: moneyFormat(results.taxFees.total, "TRY")
        },
        {
            key: "Tahmini satış fiyatı",
            value: moneyFormat(results.prices.taxAdded, "TRY"),
            isHighlighted: true
        }
    ];
};

/**
 * @param {object} opts
 * @param {number} opts.price
 * @param {string} opts.currency
 * @returns {{key: string, value: string}[]}
 */
const buildScreenshotInput = ({ price, currency }) => {
    return [
        {
            key: "Konsol fiyatı",
            value: moneyFormat(price, currency)
        }
    ];
};

export {
    shouldShowResults,
    handleQuery,
    buildResultList,
    buildScreenshotInput
};
