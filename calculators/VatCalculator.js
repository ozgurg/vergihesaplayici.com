import { normalizeCalculatorResults } from "@/utils/normalize-calculator-results.js";
import { calculateTaxFromTaxAddedPrice, calculateTaxFromTaxFreePrice } from "@/utils/calculate-tax.js";

/**
 * @typedef Mode
 * @type {{TaxAddedPriceToTaxFreePrice: string, TaxFreePriceToTaxAddedPrice: string}}
 */
const Mode = {
    TaxFreePriceToTaxAddedPrice: "tax-free-to-tax-added",
    TaxAddedPriceToTaxFreePrice: "tax-added-to-tax-free"
};

/**
 * `null` values will be assigned while calculating
 */
class VatCalculator {
    /**
     * @type {Object<string, number | null>}
     */
    #taxFees = {
        total: null,
        valueAddedTax: null // TRY | Turkish: Katma Değer Vergisi (KDV)
    };

    /**
     * @type {Object<string, number | null>}
     */
    #taxRates = {
        total: null,
        valueAddedTax: null // Percentage of previous price | Turkish: Katma Değer Vergisi (KDV)
    };

    /**
     * @type {Object<string, number | null>}
     */
    #prices = {
        taxFree: null,
        taxAdded: null
    };

    #price;
    #mode;
    #rate;

    /**
     * @param {object} params
     * @param {number} params.price
     * @param {number} params.rate
     * @param {Mode} params.mode
     */
    constructor({ price, rate, mode }) {
        this.#price = price;
        this.#rate = rate;
        this.#mode = mode;

        if (this.#mode === Mode.TaxAddedPriceToTaxFreePrice) {
            this.#prices.taxAdded = price;
        } else if (this.#mode === Mode.TaxFreePriceToTaxAddedPrice) {
            this.#prices.taxFree = price;
        }
    }

    /**
     * @returns {Object<string, Object<string, number | null>>}
     */
    calculate() {
        this.#taxRates.valueAddedTax = this.#rate;

        if (this.#mode === Mode.TaxAddedPriceToTaxFreePrice) {
            this.#taxFees.valueAddedTax = calculateTaxFromTaxAddedPrice(this.#price, this.#taxRates.valueAddedTax);
            this.#price -= this.#taxFees.valueAddedTax;
            this.#prices.taxFree = this.#price;
        } else if (this.#mode === Mode.TaxFreePriceToTaxAddedPrice) {
            this.#taxFees.valueAddedTax = calculateTaxFromTaxFreePrice(this.#price, this.#taxRates.valueAddedTax);
            this.#price += this.#taxFees.valueAddedTax;
            this.#prices.taxAdded = this.#price;
        }

        return normalizeCalculatorResults({
            taxFees: this.#taxFees,
            taxRates: this.#taxRates,
            prices: this.#prices
        });
    }
}

export default VatCalculator;

export {
    Mode
};
