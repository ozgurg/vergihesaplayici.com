/**
 * @param {number} price
 * @returns {number}
 */
const normalizePrice = price => {
    return parseFloat(price.toFixed(2));
};

/**
 * @param {string|number} price
 * @param {string} currency
 * @returns {string}
 */
const moneyFormat = (price, currency) => {
    const formatter = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency,
        minimumFractionDigits: 2
    });
    return formatter.format(price);
};

/**
 * @param {any} number
 * @returns {string}
 */
const numberFormat = number => {
    const formatter = new Intl.NumberFormat("tr-TR", {
        minimumFractionDigits: 2
    });
    return formatter.format(number);
};

export {
    normalizePrice,
    moneyFormat,
    numberFormat
};
