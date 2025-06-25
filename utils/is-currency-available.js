/**
 * @param {string} currency
 * @param {string[]} availableCurrencies
 * @returns {boolean}
 */
export const isCurrencyAvailable = (currency, availableCurrencies) => availableCurrencies.includes(currency);
