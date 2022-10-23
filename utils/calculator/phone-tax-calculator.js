import { isCurrencyAvailable } from "@/utils/is-currency-available.js";

/**
 * Decides whether to show the calculator results or not.
 * It doesn't validate the inputs. They must be validated before it can be used.
 *
 * @param {Object<*, *>} form
 * @returns {boolean}
 */
const shouldShowResults = form => {
    return form.price > 0 &&
        form.currency !== "" &&
        form.registration !== "";
};

/**
 * @param {Object<*, *>} query
 * @param {object} requirements
 * @param {string[]} requirements.availableCurrencies
 * @param {{value: string}[]} requirements.registration
 * @returns {{price: number, currency: string, registration: string}|void}
 */
const handleQuery = (query, { availableCurrencies, registration }) => {
    const form = {};

    if (!query) return;

    if (query.price && query.price > 0) {
        form.price = parseFloat(query.price);
    }

    if (query.currency && isCurrencyAvailable(query.currency, availableCurrencies)) {
        form.currency = query.currency;
    }

    const isValidRegistrationValue = registration.some(object => object.value === query.registration);
    if (query.registration && isValidRegistrationValue) {
        form.registration = query.registration;
    }

    return form;
};

export {
    shouldShowResults,
    handleQuery
};
