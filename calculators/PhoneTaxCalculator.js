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
		registration: 1838 // TRY
	};

	/**
	 * @private
	 */
	_taxRates = {
		total: 0, // Percent
		ministryOfCulture: 1, // Percent
		trt: 10, // Percent
		sct: 0, // Percent, varies by the price
		vat: 18, // Percent
		trtPassport: 20 // EUR
	};

	/**
	 * Calculates ministry of culture fee
	 * Turkish: Kültür Bakanlığı
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
	 * Calculates TRT banderole fee
	 * Turkish: TRT bandrolü (İthalat yoluyla kayıtlı)
	 *
	 * @private
	 */
	_trtFee() {
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
	 * Calculates TRT banderole fee (Passport)
	 * Turkish: TRT bandrolü (Pasaport yoluyla kayıtlı)
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
	 * Calculates special consumption tax (SCT)
	 * The SCT rate is varies by the price
	 * Turkish: Özel Tüketim Vergisi (ÖTV)
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
	 * Calculates passport registration fee
	 * Turkish: Kayıt ücreti
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
	 * Returns SCT rate by the given price
	 *
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
	 * Calculates and returns total tax fee by the registration type
	 *
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
	 * Calculates the taxes in phone price
	 *
	 * @return {PhoneTaxCalculator}
	 */
	calculate() {
		switch (this._options.registration) {
			case PhoneTaxCalculator.Registration.Import:
				if (this._mode === BaseCalculator.CalculationMode.FromBasePrice) {
					this._ministryOfCultureFee();
					this._trtFee();
					this._sctFee();
					this._vatFee();
				} else if (this._mode === BaseCalculator.CalculationMode.FromSalePrice) {
					this._vatFee();
					this._sctFee();
					this._trtFee();
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

		// Calculate totals
		this._taxFees.total = this._calculateTotalTaxFee();
		this._taxRates.total = this.calculateTotalTaxRate();

		this.formatResults();

		return this;
	}
}

export default PhoneTaxCalculator;