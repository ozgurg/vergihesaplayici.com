const isCurrencyAvailable = (currency, availableCurrencies) => {
    return availableCurrencies.includes(currency);
};

export {
    isCurrencyAvailable
};
