import BaseCalculator from "./BaseCalculator";

class ConsoleTaxCalculator extends BaseCalculator {
	/**
	 * @private
	 */
	_taxFees = {
		total: 0, // TRY
		custom: 0, // TRY
		sct: 0, // TRY
		vat: 0 // TRY
	};

	/**
	 * @private
	 */
	_taxRates = {
		total: 0, // Percent
		custom: 20, // Percent
		sct: 20, // Percent
		vat: 18 // Percent
	};

	/**
	 * @return {{total: number, sct: number, custom: number, vat: number}}
	 */
	get taxFees() {
		return this._taxFees;
	}

	/**
	 * @return {{total: number, sct: number, custom: number, vat: number}}
	 */
	get taxRates() {
		return this._taxRates;
	}

	/**
	 * @return {{salePrice: number, basePrice: number}}
	 */
	get prices() {
		return this._prices;
	}

	/**
	 * Calculates custom fee
	 * Turkish: Gümrük Vergisi
	 *
	 * @private
	 */
	_custom() {
		switch (this._mode) {
			case BaseCalculator.CalculationMode.FromBasePrice:
				this._taxFees.custom = this.calculateTaxFromTaxFreePrice(this._prices.salePrice, this._taxRates.custom);
				this._prices.salePrice += this._taxFees.custom;
				break;

			case BaseCalculator.CalculationMode.FromSalePrice:
				this._taxFees.custom = this.calculateTaxFromTaxAddedPrice(this._prices.basePrice, this._taxRates.custom);
				this._prices.basePrice -= this._taxFees.custom;
				break;
		}
	}

	/**
	 * Calculates special consumption tax (SCT)
	 * Turkish: Özel Tüketim Vergisi (ÖTV)
	 *
	 * @private
	 */
	_sctFee() {
		switch (this._mode) {
			case BaseCalculator.CalculationMode.FromBasePrice:
				this._taxFees.sct = this.calculateTaxFromTaxFreePrice(this._prices.salePrice, this._taxRates.sct);
				this._prices.salePrice += this._taxFees.sct;
				break;

			case BaseCalculator.CalculationMode.FromSalePrice:
				this._taxFees.sct = this.calculateTaxFromTaxAddedPrice(this._prices.basePrice, this._taxRates.sct);
				this._prices.basePrice -= this._taxFees.sct;
				break;
		}
	}

	/**
	 * Calculates value-added tax (VAT)
	 * Turkish: Katma Değer Vergisi (KDV)
	 *
	 * @private
	 */
	_vatFee() {
		switch (this._mode) {
			case BaseCalculator.CalculationMode.FromBasePrice:
				this._taxFees.vat = this.calculateTaxFromTaxFreePrice(this._prices.salePrice, this._taxRates.vat);
				this._prices.salePrice += this._taxFees.vat;
				break;

			case BaseCalculator.CalculationMode.FromSalePrice:
				this._taxFees.vat = this.calculateTaxFromTaxAddedPrice(this._prices.basePrice, this._taxRates.vat);
				this._prices.basePrice -= this._taxFees.vat;
				break;
		}
	}

	/**
	 * Calculates and returns total tax fee
	 *
	 * @return {number}
	 * @private
	 */
	_calculateTotalTaxFee() {
		return this._taxFees.custom + this._taxFees.sct + this._taxFees.vat;
	}

	/**
	 * Calculates the taxes in game console
	 *
	 * @return {ConsoleTaxCalculator}
	 */
	calculate() {
		if (this._mode === BaseCalculator.CalculationMode.FromBasePrice) {
			this._custom();
			this._sctFee();
			this._vatFee();
		} else if (this._mode === BaseCalculator.CalculationMode.FromSalePrice) {
			this._vatFee();
			this._sctFee();
			this._custom();
		}

		// Calculate totals
		this._taxFees.total = this._calculateTotalTaxFee();
		this._taxRates.total = this.calculateTotalTaxRate();

		this.formatResults();

		return this;
	}
}

export default ConsoleTaxCalculator;