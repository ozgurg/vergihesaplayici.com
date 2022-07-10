import MultiCurrencyTaxCalculator from "@/calculators/MultiCurrencyTaxCalculator";
import {
    calculateTaxFromTaxAddedPrice,
    calculateTaxFromTaxFreePrice,
    calculateTotalTaxRate
} from "@/utils/calculate-tax";

/**
 * @param {number} price
 * @return {number}
 */
const getSctRateByPrice = price => {
    if (price <= 640) {
        return 25;
    } else if (price > 640 && price < 1500) {
        return 40;
    } else if (price >= 1500) {
        return 50;
    }
};

/**
 * @class PhoneTaxCalculator
 * @extends {MultiCurrencyTaxCalculator}
 */
class PhoneTaxCalculator extends MultiCurrencyTaxCalculator {
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
        registration: 2732.4 // TRY
    };

    /**
     * @protected
     * @type {{trtPassport: number, total: number, sct: number, trt: number, vat: number, ministryOfCulture: number}}
     */
    taxRates = {
        total: 0, // Percent
        ministryOfCulture: 1, // Percent
        trt: 12, // Percent
        sct: 0, /** Percent but varies by the price. See {@link getSctRateByPrice} **/
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
        switch (this.mode) {
            case MultiCurrencyTaxCalculator.Mode.BasePriceToSalePrice:
                this.taxFees.ministryOfCulture = calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.ministryOfCulture);
                this.prices.salePrice += this.taxFees.ministryOfCulture;
                break;

            case MultiCurrencyTaxCalculator.Mode.SalePriceToBasePrice:
                this.taxFees.ministryOfCulture = calculateTaxFromTaxAddedPrice(this.prices.basePrice, this.taxRates.ministryOfCulture);
                this.prices.basePrice -= this.taxFees.ministryOfCulture;
                break;
        }
    }

    /**
     * @private
     */
    trtImportFee() {
        switch (this.mode) {
            case MultiCurrencyTaxCalculator.Mode.BasePriceToSalePrice:
                this.taxFees.trt = calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.trt);
                this.prices.salePrice += this.taxFees.trt;
                break;

            case MultiCurrencyTaxCalculator.Mode.SalePriceToBasePrice:
                this.taxFees.trt = calculateTaxFromTaxAddedPrice(this.prices.basePrice, this.taxRates.trt);
                this.prices.basePrice -= this.taxFees.trt;
                break;
        }
    }

    /**
     * @private
     */
    trtPassportFee() {
        this.taxFees.trtPassport = this.taxRates.trtPassport * this.exchangeRates.EUR.rate;

        switch (this.mode) {
            case MultiCurrencyTaxCalculator.Mode.BasePriceToSalePrice:
                this.prices.salePrice += this.taxFees.trtPassport;
                break;

            case MultiCurrencyTaxCalculator.Mode.SalePriceToBasePrice:
                this.prices.basePrice -= this.taxFees.trtPassport;
                break;
        }
    }

    /**
     * @private
     */
    sctFee() {
        switch (this.mode) {
            case MultiCurrencyTaxCalculator.Mode.BasePriceToSalePrice:
                this.taxRates.sct = getSctRateByPrice(this.prices.salePrice);
                this.taxFees.sct = calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.sct);
                this.prices.salePrice += this.taxFees.sct;
                break;

            case MultiCurrencyTaxCalculator.Mode.SalePriceToBasePrice:
                this.taxRates.sct = getSctRateByPrice(this.prices.basePrice);
                this.taxFees.sct = calculateTaxFromTaxAddedPrice(this.prices.basePrice, this.taxRates.sct);
                this.prices.basePrice -= this.taxFees.sct;
                break;
        }
    }

    /**
     * @private
     */
    vatFee() {
        switch (this.mode) {
            case MultiCurrencyTaxCalculator.Mode.BasePriceToSalePrice:
                this.taxFees.vat = calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.vat);
                this.prices.salePrice += this.taxFees.vat;
                break;

            case MultiCurrencyTaxCalculator.Mode.SalePriceToBasePrice:
                this.taxFees.vat = calculateTaxFromTaxAddedPrice(this.prices.basePrice, this.taxRates.vat);
                this.prices.basePrice -= this.taxFees.vat;
                break;
        }
    }

    /**
     * @private
     */
    registrationFee() {
        switch (this.mode) {
            case MultiCurrencyTaxCalculator.Mode.BasePriceToSalePrice:
                this.prices.salePrice += this.taxFees.registration;
                break;

            case MultiCurrencyTaxCalculator.Mode.SalePriceToBasePrice:
                this.prices.basePrice -= this.taxFees.registration;
                break;
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
        return calculateTotalTaxRate(this.taxFees.total, this.prices.basePrice);
    }

    /**
     * @public
     * @override
     * @return {PhoneTaxCalculator}
     */
    calculate() {
        if (this.registration === PhoneTaxCalculator.Registration.Import) {
            const functionsToCall = [
                this.ministryOfCultureFee,
                this.trtImportFee,
                this.sctFee,
                this.vatFee
            ];

            switch (this.mode) {
                case MultiCurrencyTaxCalculator.Mode.BasePriceToSalePrice:
                    this.callInOrder(functionsToCall);
                    break;

                case MultiCurrencyTaxCalculator.Mode.SalePriceToBasePrice:
                    this.callInReverseOrder(functionsToCall);
                    break;
            }
        } else if (this.registration === PhoneTaxCalculator.Registration.Passport) {
            const functionsToCall = [
                this.trtPassportFee,
                this.registrationFee
            ];

            switch (this.mode) {
                case MultiCurrencyTaxCalculator.Mode.BasePriceToSalePrice:
                    this.callInOrder(functionsToCall);
                    break;

                case MultiCurrencyTaxCalculator.Mode.SalePriceToBasePrice:
                    this.callInReverseOrder(functionsToCall);
                    break;
            }
        }

        return this;
    }
}

export default PhoneTaxCalculator;

export {
    getSctRateByPrice
};
