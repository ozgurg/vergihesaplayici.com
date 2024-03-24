import {
    calculateTaxFromTaxAddedPrice,
    calculateTaxFromTaxFreePrice,
    calculateTotalTaxRate
} from "@/utils/calculate-tax.js";
import { normalizeCalculatorResults } from "@/utils/normalize-calculator-results.js";

/**
 * `null` values will be assigned while calculating.
 */
class Calculator {
    /**
     * @type {{[key: string]: number|null}}
     */
    #taxFees = {
        total: null,
        customTax: null, // TRY | Turkish: Gümrük Vergisi
        specialConsumptionTax: null, // TRY | Turkish: Özel Tüketim Vergisi (ÖTV)
        valueAddedTax: null // TRY | Turkish: Katma Değer Vergisi (KDV)
    };

    /**
     * @type {{[key: string]: number|null}}
     */
    #taxRates = {
        total: null,
        customTax: 20, // Percentage of previous price | Turkish: Gümrük Vergisi
        specialConsumptionTax: 20, // Percentage of previous price | Turkish: Özel Tüketim Vergisi (ÖTV)
        valueAddedTax: 20 // Percentage of previous price | Turkish: Katma Değer Vergisi (KDV)
    };

    /**
     * @type {{[key: string]: number|null}}
     */
    #prices = {
        taxFree: null,
        taxAdded: null
    };

    #price;
    #calculateFromTaxAddedPrice;

    /**
     * @param {object} params
     * @param {number} params.price
     * @param {object} options
     * @param {boolean} options.calculateFromTaxAddedPrice
     */
    constructor({ price }, { calculateFromTaxAddedPrice = false } = {}) {
        this.#price = price;
        this.#calculateFromTaxAddedPrice = calculateFromTaxAddedPrice;

        if (this.#calculateFromTaxAddedPrice) {
            this.#prices.taxAdded = price;
        } else {
            this.#prices.taxFree = price;
        }
    }

    /**
     * @param {number} price
     */
    #doCalculation(price) {
        this.#calculateFromTaxAddedPrice ? this.#price -= price : this.#price += price;
    }

    /**
     * @param {{[key: string]: number|null}} taxFees
     * @returns {number}
     */
    #calculateTotalTaxFee(taxFees) {
        return taxFees.customTax + taxFees.specialConsumptionTax + taxFees.valueAddedTax;
    }

    /**
     * @param {number} price
     * @param {number} rate
     * @returns {number}
     */
    #calculateTax(price, rate) {
        return this.#calculateFromTaxAddedPrice ? calculateTaxFromTaxAddedPrice(price, rate) : calculateTaxFromTaxFreePrice(price, rate);
    }

    #_customTax() {
        this.#taxFees.customTax = this.#calculateTax(this.#price, this.#taxRates.customTax);
        this.#doCalculation(this.#taxFees.customTax);
    }

    #_specialConsumptionTax() {
        this.#taxFees.specialConsumptionTax = this.#calculateTax(this.#price, this.#taxRates.specialConsumptionTax);
        this.#doCalculation(this.#taxFees.specialConsumptionTax);
    }

    #_valueAddedTax() {
        this.#taxFees.valueAddedTax = this.#calculateTax(this.#price, this.#taxRates.valueAddedTax);
        this.#doCalculation(this.#taxFees.valueAddedTax);
    }

    /**
     * @returns {{[key: string]: {[key: string]: number|null}}}
     */
    calculate() {
        this.#_customTax();
        this.#_specialConsumptionTax();
        this.#_valueAddedTax();

        if (this.#calculateFromTaxAddedPrice) {
            this.#prices.taxFree = this.#price;
        } else {
            this.#prices.taxAdded = this.#price;
        }

        this.#taxFees.total = this.#calculateTotalTaxFee(this.#taxFees);
        this.#taxRates.total = calculateTotalTaxRate(this.#taxFees.total, this.#prices.taxFree);

        return normalizeCalculatorResults({
            taxFees: this.#taxFees,
            taxRates: this.#taxRates,
            prices: this.#prices
        });
    }
}

export default Calculator;
