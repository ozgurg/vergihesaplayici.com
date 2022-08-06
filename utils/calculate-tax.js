import { normalizePrice } from "@/utils/formatter.js";

/**
 * @param {number} taxFreePrice
 * @param {number} taxRate
 * @returns {number}
 */
const calculateTaxFromTaxFreePrice = (taxFreePrice, taxRate) => {
    return normalizePrice((taxFreePrice / 100) * taxRate);
};

/**
 * @param {number} taxAddedPrice
 * @param {number} taxRate
 * @returns {number}
 */
const calculateTaxFromTaxAddedPrice = (taxAddedPrice, taxRate) => {
    return normalizePrice(taxAddedPrice / (1 + (100 / taxRate)));
};

/**
 * @param {number} taxFee
 * @param {number} price
 * @returns {number}
 */
const calculateTotalTaxRate = (taxFee, price) => {
    return ((taxFee / price) * 100);
};

export {
    calculateTaxFromTaxFreePrice,
    calculateTaxFromTaxAddedPrice,
    calculateTotalTaxRate
};
