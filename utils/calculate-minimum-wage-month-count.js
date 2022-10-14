/**
 * @param {number} price
 * @param {number} minimumWage
 * @returns {string}
 */
const calculateMinimumWageMonthCount = (price, minimumWage) => {
    return (price / minimumWage).toFixed(1);
};

/**
 * @param {number} price
 * @param {number} minimumWage
 * @returns {string}
 */
const calculateMinimumWageDayCount = (price, minimumWage) => {
    return ((price / minimumWage) * 30).toFixed(0);
};

export {
    calculateMinimumWageMonthCount,
    calculateMinimumWageDayCount
};
