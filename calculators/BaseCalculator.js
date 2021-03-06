class BaseCalculator {
    static CalculationMode = {
    	FromBasePrice: "basePrice",
    	FromSalePrice: "salePrice"
    };

    _exchangeRates = {};
    _prices = {
    	basePrice: 0, // Tax free price
    	salePrice: 0 // Tax added price
    };
    _mode = null;
    _options = {};

    _taxFees = {};
    _taxRates = {};
    _infos = {};

    /**
     * @param {object} exchangeRates
     * @param {number} price
     * @param {string} mode
     * @param {object} options - Options for specific cases
     */
    constructor(exchangeRates, price, mode, options = {}) {
    	this._exchangeRates = exchangeRates;
    	this._prices.basePrice = price;
    	this._prices.salePrice = price;
    	this._mode = mode;
    	this._options = options;
    }

    /**
     * @return {number}
     * @protected
     */
    calculateTotalTaxRate() {
    	return ((this._taxFees.total / this._prices.basePrice) * 100);
    }

    /**
     * @param {number} taxFreePrice
     * @param {number} taxRate
     * @return {number}
     * @protected
     */
    calculateTaxFromTaxFreePrice(taxFreePrice, taxRate) {
    	return (taxFreePrice / 100) * taxRate;
    }

    /**
     * @param {number} taxAddedPrice
     * @param {number} taxRate
     * @return {number}
     * @protected
     */
    calculateTaxFromTaxAddedPrice(taxAddedPrice, taxRate) {
    	return taxAddedPrice / (1 + (100 / taxRate));
    }

    /**
     * Normalize calculation results to make them more readable for humans
     *
     * @protected
     */
    normalizeResults() {
    	for (const [key, value] of Object.entries(this._prices)) {
    		this._prices[key] = parseFloat(value.toFixed(2));
    	}

    	for (const [key, value] of Object.entries(this._taxFees)) {
    		this._taxFees[key] = parseFloat(value.toFixed(2));
    	}

    	for (const [key, value] of Object.entries(this._taxRates)) {
    		this._taxRates[key] = parseFloat(value.toFixed(2));
    	}
    }

    /**
     * @param {string} currency
     * @return {string}
     * @static
     */
    static getCalculationModeByCurrency(currency) {
    	return currency === "TRY" ?
    		this.CalculationMode.FromSalePrice :
    		this.CalculationMode.FromBasePrice;
    }

    get taxFees() {
    	return this._taxFees;
    }

    get taxRates() {
    	return this._taxRates;
    }

    get prices() {
    	return this._prices;
    }

    get infos() {
    	return this._infos;
    }
}

export default BaseCalculator;
