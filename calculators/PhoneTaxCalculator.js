import BaseCalculator from "./BaseCalculator";

class PhoneTaxCalculator extends BaseCalculator {
    static Registration = {
    	Import: "import",
    	Passport: "passport"
    };

    /**
     * @private
     */
    _taxFees = {
    	total: 0, // TRY
    	ministryOfCulture: 0, // TRY
    	trt: 0, // TRY
    	sct: 0, // TRY
    	vat: 0, // TRY
    	trtPassport: 0, // TRY
    	registration: 2006.20 // TRY
    };

    /**
     * @private
     */
    _taxRates = {
    	total: 0, // Percent
    	ministryOfCulture: 1, // Percent
    	trt: 10, // Percent
    	sct: 0, // Percent but varies by the price. Checkout: _getSctRate
    	vat: 18, // Percent
    	trtPassport: 20 // EUR
    };

    /**
     * TR: Kültür Bakanlığı
     *
     * @private
     */
    _ministryOfCultureFee() {
    	switch (this._mode) {
    		case BaseCalculator.CalculationMode.FromBasePrice:
    			this._taxFees.ministryOfCulture = this.calculateTaxFromTaxFreePrice(this._prices.salePrice, this._taxRates.ministryOfCulture);
    			this._prices.salePrice += this._taxFees.ministryOfCulture;
    			break;

    		case BaseCalculator.CalculationMode.FromSalePrice:
    			this._taxFees.ministryOfCulture = this.calculateTaxFromTaxAddedPrice(this._prices.basePrice, this._taxRates.ministryOfCulture);
    			this._prices.basePrice -= this._taxFees.ministryOfCulture;
    			break;
    	}
    }

    /**
     * TR: TRT bandrolü (Registration.Import)
     *
     * @private
     */
    _trtImportFee() {
    	switch (this._mode) {
    		case BaseCalculator.CalculationMode.FromBasePrice:
    			this._taxFees.trt = this.calculateTaxFromTaxFreePrice(this._prices.salePrice, this._taxRates.trt);
    			this._prices.salePrice += this._taxFees.trt;
    			break;

    		case BaseCalculator.CalculationMode.FromSalePrice:
    			this._taxFees.trt = this.calculateTaxFromTaxAddedPrice(this._prices.basePrice, this._taxRates.trt);
    			this._prices.basePrice -= this._taxFees.trt;
    			break;
    	}
    }

    /**
     * TR: TRT bandrolü (Registration.Passport)
     *
     * @private
     */
    _trtPassportFee() {
    	this._taxFees.trtPassport = this._taxRates.trtPassport * this._exchangeRates["EUR"]["rate"];

    	switch (this._mode) {
    		case BaseCalculator.CalculationMode.FromBasePrice:
    			this._prices.salePrice += this._taxFees.trtPassport;
    			break;

    		case BaseCalculator.CalculationMode.FromSalePrice:
    			this._prices.basePrice -= this._taxFees.trtPassport;
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
    			this._taxRates.sct = this._getSctRate(this._prices.salePrice);
    			this._taxFees.sct = this.calculateTaxFromTaxFreePrice(this._prices.salePrice, this._taxRates.sct);
    			this._prices.salePrice += this._taxFees.sct;
    			break;

    		case BaseCalculator.CalculationMode.FromSalePrice:
    			this._taxRates.sct = this._getSctRate(this._prices.basePrice);
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
     * TR: Kayıt ücreti
     *
     * @private
     */
    _registrationFee() {
    	switch (this._mode) {
    		case BaseCalculator.CalculationMode.FromBasePrice:
    			this._prices.salePrice += this._taxFees.registration;
    			break;

    		case BaseCalculator.CalculationMode.FromSalePrice:
    			this._prices.basePrice -= this._taxFees.registration;
    			break;
    	}
    }

    /**
     * @param {Number} price
     * @return {Number}
     * @private
     */
    _getSctRate(price) {
    	if (price <= 640) {
    		return 25;
    	} else if (price >= 640 && price <= 1500) {
    		return 40;
    	} else if (price > 1500) {
    		return 50;
    	}
    }

    /**
     * @return {number}
     * @private
     */
    _calculateTotalTaxFee() {
    	if (this._options.registration === PhoneTaxCalculator.Registration.Import) {
    		return this._taxFees.ministryOfCulture + this._taxFees.trt + this._taxFees.sct + this._taxFees.vat;
    	} else if (this._options.registration === PhoneTaxCalculator.Registration.Passport) {
    		return this._taxFees.trtPassport + this._taxFees.registration;
    	}
    }

    /**
     * @return {PhoneTaxCalculator}
     */
    calculate() {
    	switch (this._options.registration) {
    		case PhoneTaxCalculator.Registration.Import:
    			if (this._mode === BaseCalculator.CalculationMode.FromBasePrice) {
    				this._ministryOfCultureFee();
    				this._trtImportFee();
    				this._sctFee();
    				this._vatFee();
    			} else if (this._mode === BaseCalculator.CalculationMode.FromSalePrice) {
    				this._vatFee();
    				this._sctFee();
    				this._trtImportFee();
    				this._ministryOfCultureFee();
    			}
    			break;

    		case PhoneTaxCalculator.Registration.Passport:
    			if (this._mode === BaseCalculator.CalculationMode.FromBasePrice) {
    				this._trtPassportFee();
    				this._registrationFee();
    			} else if (this._mode === BaseCalculator.CalculationMode.FromSalePrice) {
    				this._registrationFee();
    				this._trtPassportFee();
    			}
    			break;
    	}

    	this._taxFees.total = this._calculateTotalTaxFee();
    	this._taxRates.total = this.calculateTotalTaxRate();

    	this.normalizeResults();

    	return this;
    }
}

export default PhoneTaxCalculator;