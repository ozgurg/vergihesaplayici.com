import TaxCalculator from "@/calculators/TaxCalculator.js";

/**
 * @readonly
 * @typedef {string} Mode
 * @type {{TaxAddedPriceToTaxFreePrice: string, TaxFreePriceToTaxAddedPrice: string}}
 */
const Mode = {
    TaxFreePriceToTaxAddedPrice: "taxFreePriceToTaxAddedPrice",
    TaxAddedPriceToTaxFreePrice: "taxAddedPriceToTaxFreePrice"
};

/**
 * @class VatCalculator
 * @augments TaxCalculator
 */
class VatCalculator extends TaxCalculator {
    price;
    mode;

    /**
     * @param {object} options
     * @param {number} options.price
     * @param {Mode} options.mode
     */
    constructor({ price, mode }) {
        super();

        this.price = price;
        this.mode = mode;
    }

    /**
     * @protected
     * @override
     * @returns {number}
     */
    calculateTotalTaxFee() {
        return 0;
    }

    /**
     * @protected
     * @override
     * @returns {number}
     */
    calculateTotalTaxRate() {
        return 0;
    }

    /**
     * @returns {VatCalculator}
     */
    calculate() {
        // TODO
        return this;
    }
}

export default VatCalculator;

export {
    Mode
};
