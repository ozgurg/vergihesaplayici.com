/**
 * @param {string} currency
 * @param {string[]} availableCurrencies
 * @returns {boolean}
 */
const isCurrencyAvailable = (currency, availableCurrencies) => {
    return availableCurrencies.includes(currency);
};

export {
    isCurrencyAvailable
};
