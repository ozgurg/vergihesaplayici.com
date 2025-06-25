/**
 * @param {number} price
 * @param {number} minimumWagePerMonth
 * @returns {string}
 */
export const calculateMinimumWageMonthCount = (price, minimumWagePerMonth) => {
    return (price / minimumWagePerMonth).toFixed(1);
};

/**
 * @param {number} price
 * @param {number} minimumWagePerMonth
 * @returns {string}
 */
export const calculateMinimumWageDayCount = (price, minimumWagePerMonth) => {
    return ((price / minimumWagePerMonth) * 30).toFixed(0);
};
