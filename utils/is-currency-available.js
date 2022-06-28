/**
 * @param {string} currency
 * @param {[string]} availableCurrencies
 * @return {boolean}
 */
const isCurrencyAvailable = (currency, availableCurrencies) => {
    return availableCurrencies.includes(currency);
};

export {
    isCurrencyAvailable
};
