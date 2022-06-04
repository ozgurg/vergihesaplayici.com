import BaseMultiCurrencyTaxCalculator from "@/calculators/BaseMultiCurrencyTaxCalculator";

/**
 * @class
 * @extends {BaseMultiCurrencyTaxCalculator}
 */
class PhoneTaxCalculator extends BaseMultiCurrencyTaxCalculator {
    /**
     * @static
     * @type {{Passport: string, Import: string}}
     */
    static Registration = {
        Import: "import",
        Passport: "passport"
    };

    /**
     * @protected
     * @type {{trtPassport: number, total: number, sct: number, trt: number, vat: number, registration: number, ministryOfCulture: number}}
     */
    taxFees = {
        total: 0, // TRY
        ministryOfCulture: 0, // TRY
        trt: 0, // TRY
        sct: 0, // TRY
        vat: 0, // TRY
        trtPassport: 0, // TRY
        registration: 2732.4 // TRY Source: https://www.turmob.org.tr/arsiv/mbs/resmigazete/31696-4-4.pdf
    };

    /**
     * @protected
     * @type {{trtPassport: number, total: number, sct: number, trt: number, vat: number, ministryOfCulture: number}}
     */
    taxRates = {
        total: 0, // Percent
        ministryOfCulture: 1, // Percent
        trt: 12, // Percent
        sct: 0, // Percent but varies by the price. See getSctRateByPrice
        vat: 18, // Percent
        trtPassport: 20 // EUR
    };

    /**
     * @private
     * @type {Registration}
     */
    registration = null;

    /**
     * @param {object} params
     * @param {Registration} registration
     */
    constructor(params, { registration }) {
        super(params);

        this.registration = registration;
    }

    /**
     * @private
     */
    ministryOfCultureFee() {
        switch (this.calculationMode) {
            case BaseMultiCurrencyTaxCalculator.CalculationMode.FromBasePrice:
                this.taxFees.ministryOfCulture = this.constructor.calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.ministryOfCulture);
                this.prices.salePrice += this.taxFees.ministryOfCulture;
                break;

            case BaseMultiCurrencyTaxCalculator.CalculationMode.FromSalePrice:
                this.taxFees.ministryOfCulture = this.constructor.calculateTaxFromTaxAddedPrice(this.prices.basePrice, this.taxRates.ministryOfCulture);
                this.prices.basePrice -= this.taxFees.ministryOfCulture;
                break;
        }
    }

    /**
     * @private
     */
    trtImportFee() {
        switch (this.calculationMode) {
            case BaseMultiCurrencyTaxCalculator.CalculationMode.FromBasePrice:
                this.taxFees.trt = this.constructor.calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.trt);
                this.prices.salePrice += this.taxFees.trt;
                break;

            case BaseMultiCurrencyTaxCalculator.CalculationMode.FromSalePrice:
                this.taxFees.trt = this.constructor.calculateTaxFromTaxAddedPrice(this.prices.basePrice, this.taxRates.trt);
                this.prices.basePrice -= this.taxFees.trt;
                break;
        }
    }

    /**
     * @private
     */
    trtPassportFee() {
        this.taxFees.trtPassport = this.taxRates.trtPassport * this.exchangeRates.EUR.rate;

        switch (this.calculationMode) {
            case BaseMultiCurrencyTaxCalculator.CalculationMode.FromBasePrice:
                this.prices.salePrice += this.taxFees.trtPassport;
                break;

            case BaseMultiCurrencyTaxCalculator.CalculationMode.FromSalePrice:
                this.prices.basePrice -= this.taxFees.trtPassport;
                break;
        }
    }

    /**
     * @private
     */
    sctFee() {
        switch (this.calculationMode) {
            case BaseMultiCurrencyTaxCalculator.CalculationMode.FromBasePrice:
                this.taxRates.sct = this.getSctRateByPrice(this.prices.salePrice);
                this.taxFees.sct = this.constructor.calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.sct);
                this.prices.salePrice += this.taxFees.sct;
                break;

            case BaseMultiCurrencyTaxCalculator.CalculationMode.FromSalePrice:
                this.taxRates.sct = this.getSctRateByPrice(this.prices.basePrice);
                this.taxFees.sct = this.constructor.calculateTaxFromTaxAddedPrice(this.prices.basePrice, this.taxRates.sct);
                this.prices.basePrice -= this.taxFees.sct;
                break;
        }
    }

    /**
     * @private
     */
    vatFee() {
        switch (this.calculationMode) {
            case BaseMultiCurrencyTaxCalculator.CalculationMode.FromBasePrice:
                this.taxFees.vat = this.constructor.calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.vat);
                this.prices.salePrice += this.taxFees.vat;
                break;

            case BaseMultiCurrencyTaxCalculator.CalculationMode.FromSalePrice:
                this.taxFees.vat = this.constructor.calculateTaxFromTaxAddedPrice(this.prices.basePrice, this.taxRates.vat);
                this.prices.basePrice -= this.taxFees.vat;
                break;
        }
    }

    /**
     * @private
     */
    registrationFee() {
        switch (this.calculationMode) {
            case BaseMultiCurrencyTaxCalculator.CalculationMode.FromBasePrice:
                this.prices.salePrice += this.taxFees.registration;
                break;

            case BaseMultiCurrencyTaxCalculator.CalculationMode.FromSalePrice:
                this.prices.basePrice -= this.taxFees.registration;
                break;
        }
    }

    /**
     * @private
     * @param {float} price
     * @return {number}
     */
    getSctRateByPrice(price) {
        if (price <= 640) {
            return 25;
        } else if (price >= 640 && price <= 1500) {
            return 40;
        } else if (price > 1500) {
            return 50;
        }
    }

    /**
     * @protected
     * @override
     * @return {number}
     */
    calculateTotalTaxFee() {
        if (this.registration === PhoneTaxCalculator.Registration.Import) {
            return this.taxFees.ministryOfCulture + this.taxFees.trt + this.taxFees.sct + this.taxFees.vat;
        } else if (this.registration === PhoneTaxCalculator.Registration.Passport) {
            return this.taxFees.trtPassport + this.taxFees.registration;
        }
    }

    /**
     * @protected
     * @override
     * @return {number}
     */
    calculateTotalTaxRate() {
        return ((this.taxFees.total / this.prices.basePrice) * 100);
    }

    /**
     * @public
     * @override
     * @return {PhoneTaxCalculator}
     */
    calculate() {
        if (this.registration === PhoneTaxCalculator.Registration.Import) {
            if (this.calculationMode === BaseMultiCurrencyTaxCalculator.CalculationMode.FromBasePrice) {
                this.ministryOfCultureFee();
                this.trtImportFee();
                this.sctFee();
                this.vatFee();
            } else if (this.calculationMode === BaseMultiCurrencyTaxCalculator.CalculationMode.FromSalePrice) {
                this.vatFee();
                this.sctFee();
                this.trtImportFee();
                this.ministryOfCultureFee();
            }
        } else if (this.registration === PhoneTaxCalculator.Registration.Passport) {
            if (this.calculationMode === BaseMultiCurrencyTaxCalculator.CalculationMode.FromBasePrice) {
                this.trtPassportFee();
                this.registrationFee();
            } else if (this.calculationMode === BaseMultiCurrencyTaxCalculator.CalculationMode.FromSalePrice) {
                this.registrationFee();
                this.trtPassportFee();
            }
        }

        return this;
    }
}

export default PhoneTaxCalculator;
