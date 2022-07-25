/**
 * @param {number} price
 * @param {number} minimumMage
 * @returns {string}
 */
const calculateMinimumWageMonthCount = (price, minimumMage) => {
    return (price / minimumMage).toFixed(2);
};

export {
    calculateMinimumWageMonthCount
};
