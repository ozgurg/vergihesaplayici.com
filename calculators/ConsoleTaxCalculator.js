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
     * TR: Gümrük vergisi
     *
     * @private
     */
    _customFee() {
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
     * TR: Özel Tüketim Vergisi (ÖTV)
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
     * TR: Katma Değer Vergisi (KDV)
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
     * @return {number}
     * @private
     */
    _calculateTotalTaxFee() {
    	return this._taxFees.custom + this._taxFees.sct + this._taxFees.vat;
    }

    /**
     * @return {ConsoleTaxCalculator}
     */
    calculate() {
    	if (this._mode === BaseCalculator.CalculationMode.FromBasePrice) {
    		this._customFee();
    		this._sctFee();
    		this._vatFee();
    	} else if (this._mode === BaseCalculator.CalculationMode.FromSalePrice) {
    		this._vatFee();
    		this._sctFee();
    		this._customFee();
    	}

    	this._taxFees.total = this._calculateTotalTaxFee();
    	this._taxRates.total = this.calculateTotalTaxRate();

    	this.normalizeResults();

    	return this;
    }
}

export default ConsoleTaxCalculator;
