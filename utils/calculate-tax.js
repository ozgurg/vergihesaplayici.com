import { normalizePrice } from "@/utils/normalize-price.js";

/**
 * @param {number} taxFreePrice
 * @param {number} taxRate
 * @return {number}
 */
const calculateTaxFromTaxFreePrice = (taxFreePrice, taxRate) => {
    return normalizePrice((taxFreePrice / 100) * taxRate);
};

/**
 * @param {number} taxAddedPrice
 * @param {number} taxRate
 * @return {number}
 */
const calculateTaxFromTaxAddedPrice = (taxAddedPrice, taxRate) => {
    return normalizePrice(taxAddedPrice / (1 + (100 / taxRate)));
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
