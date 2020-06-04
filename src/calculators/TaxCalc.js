class TaxCalc {
	static MODE_CALCULATE_FROM_BASE_PRICE = "fromBasePrice";
	static MODE_CALCULATE_FROM_SALE_PRICE = "fromSalePrice";

	_prices = {
		basePrice: 0, // Tax free
		salePrice: 0 // Tax added
	};
	_taxFees = {};
	_taxRates = {};
	_opts = {};

	constructor(args) {
		this._prices.basePrice = args.price;
		this._prices.salePrice = args.price;
		this._mode = args.mode;
		this._opts = args.opts;
	}

	_calculateTotalTaxRate() {
		return ((this._taxFees.total / this._prices.basePrice) * 100);
	}

	_calculateTaxFromTaxFreePrice(taxFreePrice, taxRate) {
		return (taxFreePrice / 100) * taxRate;
	}

	_calculateTaxFromTaxAddedPrice(taxAddedPrice, taxRate) {
		return taxAddedPrice / (1 + (100 / taxRate));
	}

	_normalizeResults() {
		for (const [key, value] of Object.entries(this._prices)) {
			this._prices = {
				...this._prices,
				[key]: parseFloat(value.toFixed(2))
			};
		}

		for (const [key, value] of Object.entries(this._taxFees)) {
			this._taxFees = {
				...this._taxFees,
				[key]: parseFloat(value.toFixed(2))
			};
		}

		for (const [key, value] of Object.entries(this._taxRates)) {
			this._taxRates = {
				...this._taxRates,
				[key]: parseFloat(value.toFixed(2))
			};
		}
	}
}


module.exports = TaxCalc;