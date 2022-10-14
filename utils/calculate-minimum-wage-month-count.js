/**
 * @param {number} price
 * @param {number} minimumMage
 * @returns {string}
 */
const calculateMinimumWageMonthCount = (price, minimumMage) => {
    return (price / minimumMage).toFixed(1);
};

export {
    calculateMinimumWageMonthCount
};
