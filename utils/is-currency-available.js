/**
 * @param {string} currency
 * @param {string[]} availableCurrencies
 * @returns {boolean}
 */
const isCurrencyAvailable = (currency, availableCurrencies) => availableCurrencies.includes(currency);

export {
    isCurrencyAvailable
};
