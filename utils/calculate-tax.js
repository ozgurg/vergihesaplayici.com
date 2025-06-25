import { normalizePrice } from "@/utils/formatter.js";

/**
 * @param {number} taxFreePrice
 * @param {number} taxRate
 * @returns {number}
 */
export const calculateTaxFromTaxFreePrice = (taxFreePrice, taxRate) => {
    return normalizePrice((taxFreePrice / 100) * taxRate);
};

/**
 * @param {number} taxAddedPrice
 * @param {number} taxRate
 * @returns {number}
 */
export const calculateTaxFromTaxAddedPrice = (taxAddedPrice, taxRate) => {
    return normalizePrice(taxAddedPrice / (1 + (100 / taxRate)));
};

/**
 * @param {number} taxFee
 * @param {number} price
 * @returns {number}
 */
export const calculateTotalTaxRate = (taxFee, price) => {
    return ((taxFee / price) * 100);
};
