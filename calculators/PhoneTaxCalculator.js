import MultiCurrencyTaxCalculator, { Mode } from "@/calculators/MultiCurrencyTaxCalculator";
import {
    calculateTaxFromTaxAddedPrice,
    calculateTaxFromTaxFreePrice,
    calculateTotalTaxRate
} from "@/utils/calculate-tax";

/**
 * @param {number} price
 * @returns {number}
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
 * @readonly
 * @typedef {string} Registration
 * @type {{Passport: string, Import: string}}
 */
const Registration = {
    Import: "import",
    Passport: "passport"
};

/**
 * @class PhoneTaxCalculator
 * @augments MultiCurrencyTaxCalculator
 */
class PhoneTaxCalculator extends MultiCurrencyTaxCalculator {
    /**
     * @protected
     * @type {Object<string, number>}
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
     * @type {Object<string, number>}
     */
    taxRates = {
        total: 0, // Percent
        ministryOfCulture: 1, // Percent
        trt: 12, // Percent
        sct: 0, /** Percent but varies by the price. See {@link getSctRateByPrice}. */
        vat: 18, // Percent
        trtPassport: 20 // EUR
    };

    /**
     * @private
     * @type {Registration}
     */
    registration;

    /**
     * @param {object} params
     * @param {object} options
     * @param {Registration} options.registration
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
            case Mode.BasePriceToSalePrice:
                this.taxFees.ministryOfCulture = calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.ministryOfCulture);
                this.prices.salePrice += this.taxFees.ministryOfCulture;
                break;

            case Mode.SalePriceToBasePrice:
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
            case Mode.BasePriceToSalePrice:
                this.taxFees.trt = calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.trt);
                this.prices.salePrice += this.taxFees.trt;
                break;

            case Mode.SalePriceToBasePrice:
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
            case Mode.BasePriceToSalePrice:
                this.prices.salePrice += this.taxFees.trtPassport;
                break;

            case Mode.SalePriceToBasePrice:
                this.prices.basePrice -= this.taxFees.trtPassport;
                break;
        }
    }

    /**
     * @private
     */
    sctFee() {
        switch (this.mode) {
            case Mode.BasePriceToSalePrice:
                this.taxRates.sct = getSctRateByPrice(this.prices.salePrice);
                this.taxFees.sct = calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.sct);
                this.prices.salePrice += this.taxFees.sct;
                break;

            case Mode.SalePriceToBasePrice:
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
            case Mode.BasePriceToSalePrice:
                this.taxFees.vat = calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.vat);
                this.prices.salePrice += this.taxFees.vat;
                break;

            case Mode.SalePriceToBasePrice:
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
            case Mode.BasePriceToSalePrice:
                this.prices.salePrice += this.taxFees.registration;
                break;

            case Mode.SalePriceToBasePrice:
                this.prices.basePrice -= this.taxFees.registration;
                break;
        }
    }

    /**
     * @protected
     * @override
     * @returns {number}
     */
    calculateTotalTaxFee() {
        if (this.registration === Registration.Import) {
            return this.taxFees.ministryOfCulture + this.taxFees.trt + this.taxFees.sct + this.taxFees.vat;
        } else if (this.registration === Registration.Passport) {
            return this.taxFees.trtPassport + this.taxFees.registration;
        }
    }

    /**
     * @protected
     * @override
     * @returns {number}
     */
    calculateTotalTaxRate() {
        return calculateTotalTaxRate(this.taxFees.total, this.prices.basePrice);
    }

    /**
     * @public
     * @override
     * @returns {PhoneTaxCalculator}
     */
    calculate() {
        if (this.registration === Registration.Import) {
            const functionsToCall = [
                this.ministryOfCultureFee,
                this.trtImportFee,
                this.sctFee,
                this.vatFee
            ];

            switch (this.mode) {
                case Mode.BasePriceToSalePrice:
                    this.callInOrder(functionsToCall);
                    break;

                case Mode.SalePriceToBasePrice:
                    this.callInReverseOrder(functionsToCall);
                    break;
            }
        } else if (this.registration === Registration.Passport) {
            const functionsToCall = [
                this.trtPassportFee,
                this.registrationFee
            ];

            switch (this.mode) {
                case Mode.BasePriceToSalePrice:
                    this.callInOrder(functionsToCall);
                    break;

                case Mode.SalePriceToBasePrice:
                    this.callInReverseOrder(functionsToCall);
                    break;
            }
        }

        return this;
    }
}

export default PhoneTaxCalculator;

export {
    getSctRateByPrice,
    Registration
};
