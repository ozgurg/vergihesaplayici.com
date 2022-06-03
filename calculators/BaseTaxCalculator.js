/**
 * @abstract
 * @class
 */
class BaseTaxCalculator {
    /**
     * @static
     * @param {number} taxFreePrice
     * @param {number} taxRate
     * @return {number}
     */
    static calculateTaxFromTaxFreePrice(taxFreePrice, taxRate) {
        return parseFloat(((taxFreePrice / 100) * taxRate).toFixed(2));
    }

    /**
     * @static
     * @param {number} taxAddedPrice
     * @param {number} taxRate
     * @return {number}
     */
    static calculateTaxFromTaxAddedPrice(taxAddedPrice, taxRate) {
        return parseFloat((taxAddedPrice / (1 + (100 / taxRate))).toFixed(2));
    }
}

export default BaseTaxCalculator;
