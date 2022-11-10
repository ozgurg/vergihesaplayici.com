/**
 * @param {number} price
 * @param {number} minimumWagePerMonth
 * @returns {string}
 */
const calculateMinimumWageMonthCount = (price, minimumWagePerMonth) => {
    return (price / minimumWagePerMonth).toFixed(1);
};

/**
 * @param {number} price
 * @param {number} minimumWagePerMonth
 * @returns {string}
 */
const calculateMinimumWageDayCount = (price, minimumWagePerMonth) => {
    return ((price / minimumWagePerMonth) * 30).toFixed(0);
};

export {
    calculateMinimumWageMonthCount,
    calculateMinimumWageDayCount
};
