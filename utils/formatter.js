/**
 * @param {number} price
 * @returns {number}
 */
export const normalizePrice = price => parseFloat(price.toFixed(1));

/**
 * @param {string | number} price
 * @param {string} currency
 * @returns {string}
 */
export const moneyFormat = (price, currency) => {
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
export const numberFormat = number => {
    const formatter = new Intl.NumberFormat("tr-TR", {
        minimumFractionDigits: 2
    });
    return formatter.format(number);
};

/**
 * @param {Date} date
 * @returns {string}
 */
export const dateFormat = date => {
    const formatter = new Intl.DateTimeFormat("tr-TR", {
        dateStyle: "full",
        timeStyle: "medium"
    });
    return formatter.format(date);
};
