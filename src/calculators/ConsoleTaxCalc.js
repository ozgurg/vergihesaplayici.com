import TaxCalc from "./TaxCalc";


class ConsoleTaxCalc extends TaxCalc {
	_taxFees = {
		total: 0,
		custom: 0,
		sct: 0,
		vat: 0
	};
	_taxRates = {
		total: 0,
		custom: 50,
		sct: 20,
		vat: 18
	};

	_custom() {
		if (this._opts && this._opts.calculateOctoberTax) {
			this._taxRates.custom = 20;
		}

		switch (this._mode) {
			case TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE:
				this._taxFees.custom = this._calculateTaxFromTaxFreePrice(this._prices.salePrice, this._taxRates.custom);
				this._prices.salePrice += this._taxFees.custom;
				break;

			case TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE:
				this._taxFees.custom = this._calculateTaxFromTaxAddedPrice(this._prices.basePrice, this._taxRates.custom);
				this._prices.basePrice -= this._taxFees.custom;
				break;
		}

		return this;
	}

	_sctFee() {
		switch (this._mode) {
			case TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE:
				this._taxFees.sct = this._calculateTaxFromTaxFreePrice(this._prices.salePrice, this._taxRates.sct);
				this._prices.salePrice += this._taxFees.sct;
				break;

			case TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE:
				this._taxFees.sct = this._calculateTaxFromTaxAddedPrice(this._prices.basePrice, this._taxRates.sct);
				this._prices.basePrice -= this._taxFees.sct;
				break;
		}

		return this;
	}

	_vatFee() {
		switch (this._mode) {
			case TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE:
				this._taxFees.vat = this._calculateTaxFromTaxFreePrice(this._prices.salePrice, this._taxRates.vat);
				this._prices.salePrice += this._taxFees.vat;
				break;

			case TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE:
				this._taxFees.vat = this._calculateTaxFromTaxAddedPrice(this._prices.basePrice, this._taxRates.vat);
				this._prices.basePrice -= this._taxFees.vat;
				break;
		}

		return this;
	}

	_calculateTotalTaxFee() {
		return this._taxFees.custom + this._taxFees.sct + this._taxFees.vat;
	}

	get prices() {
		return this._prices;
	}

	get taxFees() {
		return this._taxFees;
	}

	get taxRates() {
		return this._taxRates;
	}

	calculate() {
		if (this._mode === TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE) {
			this._custom();
			this._sctFee();
			this._vatFee();
		} else if (this._mode === TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE) {
			this._vatFee();
			this._sctFee();
			this._custom();
		}

		this._taxFees.total = this._calculateTotalTaxFee();
		this._taxRates.total = this._calculateTotalTaxRate();

		this._normalizeResults();

		return this;
	}
}


export default ConsoleTaxCalc;