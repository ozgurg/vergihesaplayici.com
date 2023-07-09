/**
 * @param {number} price
 * @returns {number}
 */
const normalizePrice = price => parseFloat(price.toFixed(1));

/**
 * @param {string | number} price
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

/**
 * @param {Date} date
 * @returns {string}
 */
const dateFormat = date => {
    const formatter = new Intl.DateTimeFormat("tr-TR", {
        dateStyle: "full",
        timeStyle: "medium"
    });
    return formatter.format(date);
};

/**
 * @param {Date} date
 * @returns {string}
 */
const relativeDateFormat = date => {
    const timeDifference = Date.now() - date.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const formatter = new Intl.RelativeTimeFormat("tr", { numeric: "auto" });
    return formatter.format(-daysDifference, "day");
};

export {
    normalizePrice,
    moneyFormat,
    numberFormat,
    dateFormat,
    relativeDateFormat
};
