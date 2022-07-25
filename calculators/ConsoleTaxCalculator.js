import MultiCurrencyTaxCalculator, { Mode } from "@/calculators/MultiCurrencyTaxCalculator";
import {
    calculateTaxFromTaxAddedPrice,
    calculateTaxFromTaxFreePrice,
    calculateTotalTaxRate
} from "@/utils/calculate-tax";

/**
 * @class ConsoleTaxCalculator
 * @augments MultiCurrencyTaxCalculator
 */
class ConsoleTaxCalculator extends MultiCurrencyTaxCalculator {
    /**
     * @protected
     * @type {{total: number, sct: number, custom: number, vat: number}}
     */
    taxFees = {
        total: 0, // TRY
        custom: 0, // TRY
        sct: 0, // TRY
        vat: 0 // TRY
    };

    /**
     * @protected
     * @type {{total: number, sct: number, custom: number, vat: number}}
     */
    taxRates = {
        total: 0, // Percent
        custom: 20, // Percent
        sct: 20, // Percent
        vat: 18 // Percent
    };

    /**
     * @private
     */
    customFee() {
        switch (this.mode) {
            case Mode.BasePriceToSalePrice:
                this.taxFees.custom = calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.custom);
                this.prices.salePrice += this.taxFees.custom;
                break;

            case Mode.SalePriceToBasePrice:
                this.taxFees.custom = calculateTaxFromTaxAddedPrice(this.prices.basePrice, this.taxRates.custom);
                this.prices.basePrice -= this.taxFees.custom;
                break;
        }
    }

    /**
     * @private
     */
    sctFee() {
        switch (this.mode) {
            case Mode.BasePriceToSalePrice:
                this.taxFees.sct = calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.sct);
                this.prices.salePrice += this.taxFees.sct;
                break;

            case Mode.SalePriceToBasePrice:
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
     * @protected
     * @override
     * @returns {number}
     */
    calculateTotalTaxFee() {
        return this.taxFees.custom + this.taxFees.sct + this.taxFees.vat;
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
     * @returns {ConsoleTaxCalculator}
     */
    calculate() {
        const functionsToCall = [
            this.customFee,
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

        return this;
    }
}

export default ConsoleTaxCalculator;
