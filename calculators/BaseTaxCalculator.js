/**
 * @abstract
 * @class
 */
class BaseTaxCalculator {
    /**
     * @protected
     * @param {float} taxFreePrice
     * @param {float} taxRate
     * @return {number}
     */
    calculateTaxFromTaxFreePrice(taxFreePrice, taxRate) {
        return parseFloat(((taxFreePrice / 100) * taxRate).toFixed(2));
    }

    /**
     * @protected
     * @param {float} taxAddedPrice
     * @param {float} taxRate
     * @return {number}
     */
    calculateTaxFromTaxAddedPrice(taxAddedPrice, taxRate) {
        return parseFloat((taxAddedPrice / (1 + (100 / taxRate))).toFixed(2));
    }
}

export default BaseTaxCalculator;
