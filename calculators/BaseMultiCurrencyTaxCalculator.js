import BaseTaxCalculator from "@/calculators/BaseTaxCalculator";

/**
 * @abstract
 * @class
 * @extends {BaseTaxCalculator}
 */
class BaseMultiCurrencyTaxCalculator extends BaseTaxCalculator {
    /**
     * @static
     * @type {{FromBasePrice: string, FromSalePrice: string}}
     */
    static CalculationMode = {
        FromBasePrice: "CALCULATION_MODE_FROM_BASE_PRICE",
        FromSalePrice: "CALCULATION_MODE_FROM_SALE_PRICE"
    };

    /**
     * @protected
     * @abstract
     * @type {object}
     */
    taxFees = {
        total: 0
    };

    /**
     * @protected
     * @abstract
     * @type {object}
     */
    taxRates = {
        total: 0
    };

    /**
     * @protected
     * @type {object}
     */
    prices = {
        basePrice: 0, // Tax free price
        salePrice: 0 // Tax added price
    };

    /**
     * @protected
     * @type {object}
     */
    exchangeRates = {};

    /**
     * @protected
     * @type {CalculationMode}
     */
    calculationMode = null;

    /**
     * @constructor
     * @param {float} price
     * @param {object} exchangeRates
     * @param {CalculationMode} calculationMode
     */
    constructor({ price, exchangeRates, calculationMode }) {
        super();

        this.prices.basePrice = price;
        this.prices.salePrice = price;
        this.exchangeRates = exchangeRates;
        this.calculationMode = calculationMode;
    }

    /**
     * @static
     * @param {string} currency
     * @return {CalculationMode}
     */
    static getCalculationModeByCurrency(currency) {
        return currency === "TRY" ?
            this.CalculationMode.FromSalePrice :
            this.CalculationMode.FromBasePrice;
    }

    /**
     * @public
     * @return {{taxRates: object, prices: object, taxFees: object}}
     */
    results() {
        this.taxFees.total = this.calculateTotalTaxFee();
        this.taxRates.total = this.calculateTotalTaxRate();

        this.normalizeResults();

        return {
            prices: this.prices,
            taxFees: this.taxFees,
            taxRates: this.taxRates
        };
    }

    /**
     * @private
     */
    normalizeResults() {
        for (const [key, value] of Object.entries(this.prices)) {
            this.prices[key] = parseFloat(value.toFixed(2));
        }

        for (const [key, value] of Object.entries(this.taxFees)) {
            this.taxFees[key] = parseFloat(value.toFixed(2));
        }

        for (const [key, value] of Object.entries(this.taxRates)) {
            this.taxRates[key] = parseFloat(value.toFixed(2));
        }
    }

    /**
     * @protected
     * @abstract
     */
    calculateTotalTaxFee() {
        throw new Error("calculateTotalTaxFee() not implemented");
    }

    /**
     * @protected
     * @abstract
     */
    calculateTotalTaxRate() {
        throw new Error("calculateTotalTaxRate() not implemented");
    }

    /**
     * @public
     * @abstract
     */
    calculate() {
        throw new Error("calculate() not implemented");
    }
}

export default BaseMultiCurrencyTaxCalculator;
