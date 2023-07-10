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
    const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;
    const timeDifference = Date.now() - date.getTime();
    const daysDifference = Math.floor(timeDifference / DAY_MILLISECONDS);

    const formatter = new Intl.RelativeTimeFormat("tr-TR", { numeric: "auto" });
    const formatted = formatter.format(-daysDifference, "day");
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export {
    normalizePrice,
    moneyFormat,
    numberFormat,
    dateFormat,
    relativeDateFormat
};
