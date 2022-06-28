/**
 * @param {number} taxFreePrice
 * @param {number} taxRate
 * @return {number}
 */
const calculateTaxFromTaxFreePrice = (taxFreePrice, taxRate) => {
    // TODO: Think about removing toFixed(2)
    return parseFloat(((taxFreePrice / 100) * taxRate).toFixed(2));
};

/**
 * @param {number} taxAddedPrice
 * @param {number} taxRate
 * @return {number}
 */
const calculateTaxFromTaxAddedPrice = (taxAddedPrice, taxRate) => {
    // TODO: Think about removing toFixed(2)
    return parseFloat((taxAddedPrice / (1 + (100 / taxRate))).toFixed(2));
};

/**
 * @param {number} taxFee
 * @param {number} price
 * @return {number}
 */
const calculateTotalTaxRate = (taxFee, price) => {
    return ((taxFee / price) * 100);
};

export {
    calculateTaxFromTaxFreePrice,
    calculateTaxFromTaxAddedPrice,
    calculateTotalTaxRate
};
