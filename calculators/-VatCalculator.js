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
 * @extends {TaxCalculator}
 */
class VatCalculator extends TaxCalculator {
    price;
    mode;

    /**
     * @param {number} price
     * @param {Mode} mode
     */
    constructor({ price, mode }) {
        super();

        this.price = price;
        this.mode = mode;
    }

    /**
     *
     */
    calculate() {

    }
}

export default VatCalculator;

export {
    Mode
};
