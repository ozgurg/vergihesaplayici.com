import TaxCalc from "./TaxCalc";
import store from "./../store/_index";


class PhoneTaxCalc extends TaxCalc {
	static REGISTRATION_IMPORT = "import";
	static REGISTRATION_PASSPORT = "passport";

	_taxFees = {
		total: 0,
		ministryOfCulture: 0,
		trt: 0,
		sct: 0,
		vat: 0,
		trtPassport: 0,
		registration: 1838
	};
	_taxRates = {
		total: 0,
		ministryOfCulture: 1,
		trt: 10,
		sct: 0, // Varies by price
		vat: 18,
		trtPassport: 20 // Euro
		// registration: 0
	};

	_ministryOfCultureFee() {
		switch (this._mode) {
			case TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE:
				this._taxFees.ministryOfCulture = this._calculateTaxFromTaxFreePrice(this._prices.salePrice, this._taxRates.ministryOfCulture);
				this._prices.salePrice += this._taxFees.ministryOfCulture;
				break;

			case TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE:
				this._taxFees.ministryOfCulture = this._calculateTaxFromTaxAddedPrice(this._prices.basePrice, this._taxRates.ministryOfCulture);
				this._prices.basePrice -= this._taxFees.ministryOfCulture;
				break;
		}

		return this;
	}

	_trtFee() {
		switch (this._mode) {
			case TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE:
				this._taxFees.trt = this._calculateTaxFromTaxFreePrice(this._prices.basePrice, this._taxRates.trt);
				this._prices.salePrice += this._taxFees.trt;
				break;

			case TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE:
				this._taxFees.trt = this._calculateTaxFromTaxAddedPrice(this._prices.basePrice, this._taxRates.trt);
				this._prices.basePrice -= this._taxFees.trt;
				break;
		}

		return this;
	}

	_trtPassportFee(EUR) {
		switch (this._mode) {
			case TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE:
				this._taxFees.trtPassport = this._taxRates.trtPassport * EUR;
				this._prices.salePrice += this._taxFees.trtPassport;
				break;

			case TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE:
				this._taxFees.trtPassport = this._taxRates.trtPassport * EUR;
				this._prices.basePrice -= this._taxFees.trtPassport;
				break;
		}

		return this;
	}

	_sctFee() {
		switch (this._mode) {
			case TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE:
				this._taxRates.sct = this._getSctRate(this._prices.salePrice);
				this._taxFees.sct = this._calculateTaxFromTaxFreePrice(this._prices.salePrice, this._taxRates.sct);
				this._prices.salePrice += this._taxFees.sct;
				break;

			case TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE:
				this._taxRates.sct = this._getSctRate(this._prices.basePrice);
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

	_registrationFee() {
		switch (this._mode) {
			case TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE:
				this._prices.salePrice += this._taxFees.registration;
				break;

			case TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE:
				this._prices.basePrice -= this._taxFees.registration;
				break;
		}

		return this;
	}

	_getSctRate(price) {
		if (price <= 640) {
			return 25;
		} else if (price >= 640 && price <= 1500) {
			return 40;
		} else if (price > 1500) {
			return 50;
		}
	}

	_calculateTotalTaxFee() {
		if (this._opts.registration === PhoneTaxCalc.REGISTRATION_IMPORT) {
			return this._taxFees.ministryOfCulture + this._taxFees.trt + this._taxFees.sct + this._taxFees.vat;
		} else if (this._opts.registration === PhoneTaxCalc.REGISTRATION_PASSPORT) {
			return this._taxFees.trtPassport + this._taxFees.registration;
		}
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
		if (this._opts.registration === PhoneTaxCalc.REGISTRATION_IMPORT) {
			if (this._mode === TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE) {
				this._ministryOfCultureFee();
				this._trtFee();
				this._sctFee();
				this._vatFee();
			} else if (this._mode === TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE) {
				this._vatFee();
				this._sctFee();
				this._trtFee();
				this._ministryOfCultureFee();
			}
		} else if (this._opts.registration === PhoneTaxCalc.REGISTRATION_PASSPORT) {
			if (this._mode === TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE) {
				this._trtPassportFee(store.getters.getExchangeRate("EUR"));
				this._registrationFee();
			} else if (this._mode === TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE) {
				this._registrationFee();
				this._trtPassportFee(store.getters.getExchangeRate("EUR"));
			}
		}

		this._taxFees.total = this._calculateTotalTaxFee();
		this._taxRates.total = this._calculateTotalTaxRate();

		this._normalizeResults();

		return this;
	}
}


export default PhoneTaxCalc;