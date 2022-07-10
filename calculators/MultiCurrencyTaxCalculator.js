import TaxCalculator from "@/calculators/TaxCalculator";
import { normalizePrice } from "@/utils/normalize-price";

/**
 * @readonly
 * @typedef {string} Mode
 * @type {{BasePriceToSalePrice: string, SalePriceToBasePrice: string}}
 */
const Mode = {
    BasePriceToSalePrice: "MODE_BASE_PRICE_TO_SALE_PRICE",
    SalePriceToBasePrice: "MODE_SALE_PRICE_TO_BASE_PRICE"
};

/**
 * @abstract
 * @class MultiCurrencyTaxCalculator
 * @extends {TaxCalculator}
 */
class MultiCurrencyTaxCalculator extends TaxCalculator {
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
        basePrice: 0, // Tax-free price
        salePrice: 0 // Tax-added price
    };

    /**
     * @protected
     * @type {object}
     */
    exchangeRates = {};

    /**
     * @protected
     * @type {Mode}
     */
    mode;

    /**
     * @constructor
     * @param {float} price
     * @param {object} exchangeRates
     * @param {Mode} mode
     */
    constructor({ price, exchangeRates, mode }) {
        super();

        this.prices.basePrice = price;
        this.prices.salePrice = price;
        this.exchangeRates = exchangeRates;
        this.mode = mode;
    }

    /**
     * @static
     * @param {string} currency
     * @return {Mode}
     */
    static getModeByCurrency(currency) {
        return currency === "TRY" ?
            Mode.SalePriceToBasePrice :
            Mode.BasePriceToSalePrice;
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
        [
            this.prices,
            this.taxFees,
            this.taxRates
        ].forEach(property => {
            for (const [key, value] of Object.entries(property)) {
                property[key] = normalizePrice(value);
            }
        });
    }

    /**
     * @protected
     * @abstract
     */
    calculateTotalTaxFee() {
        throw new Error("Not implemented");
    }

    /**
     * @protected
     * @abstract
     */
    calculateTotalTaxRate() {
        throw new Error("Not implemented");
    }

    /**
     * @public
     * @abstract
     */
    calculate() {
        throw new Error("Not implemented");
    }
}

export default MultiCurrencyTaxCalculator;

export {
    Mode
};
