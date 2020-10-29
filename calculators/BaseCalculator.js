class BaseCalculator {
	static CalculationMode = {
		FromBasePrice: "fromBasePrice",
		FromSalePrice: "fromSalePrice"
	};

	_exchangeRates = {}
	_prices = {
		basePrice: 0, // Tax free price
		salePrice: 0 // Tax added price
	};
	_taxFees = {};
	_taxRates = {};
	_options = {};

	/**
	 * @param {object} exchangeRates
	 * @param {number} price
	 * @param {string} mode
	 * @param {object} options - Calculator options for specific cases
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
	 * @protected
	 */
	formatResults() {
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
	static getModeByCurrency(currency) {
		return currency === "TRY" ?
			BaseCalculator.CalculationMode.FromSalePrice :
			BaseCalculator.CalculationMode.FromBasePrice;
	}
}

module.exports = BaseCalculator;