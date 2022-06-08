import BaseMultiCurrencyTaxCalculator from "@/calculators/BaseMultiCurrencyTaxCalculator";
import { calculateTaxFromTaxAddedPrice, calculateTaxFromTaxFreePrice } from "~/utils/calculate-tax";

/**
 * @class
 * @extends {BaseMultiCurrencyTaxCalculator}
 */
class ConsoleTaxCalculator extends BaseMultiCurrencyTaxCalculator {
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
        switch (this.calculationMode) {
            case BaseMultiCurrencyTaxCalculator.CalculationMode.BasePriceToSalePrice:
                this.taxFees.custom = calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.custom);
                this.prices.salePrice += this.taxFees.custom;
                break;

            case BaseMultiCurrencyTaxCalculator.CalculationMode.SalePriceToBasePrice:
                this.taxFees.custom = calculateTaxFromTaxAddedPrice(this.prices.basePrice, this.taxRates.custom);
                this.prices.basePrice -= this.taxFees.custom;
                break;
        }
    }

    /**
     * @private
     */
    sctFee() {
        switch (this.calculationMode) {
            case BaseMultiCurrencyTaxCalculator.CalculationMode.BasePriceToSalePrice:
                this.taxFees.sct = calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.sct);
                this.prices.salePrice += this.taxFees.sct;
                break;

            case BaseMultiCurrencyTaxCalculator.CalculationMode.SalePriceToBasePrice:
                this.taxFees.sct = calculateTaxFromTaxAddedPrice(this.prices.basePrice, this.taxRates.sct);
                this.prices.basePrice -= this.taxFees.sct;
                break;
        }
    }

    /**
     * @private
     */
    vatFee() {
        switch (this.calculationMode) {
            case BaseMultiCurrencyTaxCalculator.CalculationMode.BasePriceToSalePrice:
                this.taxFees.vat = calculateTaxFromTaxFreePrice(this.prices.salePrice, this.taxRates.vat);
                this.prices.salePrice += this.taxFees.vat;
                break;

            case BaseMultiCurrencyTaxCalculator.CalculationMode.SalePriceToBasePrice:
                this.taxFees.vat = calculateTaxFromTaxAddedPrice(this.prices.basePrice, this.taxRates.vat);
                this.prices.basePrice -= this.taxFees.vat;
                break;
        }
    }

    /**
     * @protected
     * @override
     * @return {number}
     */
    calculateTotalTaxFee() {
        return this.taxFees.custom + this.taxFees.sct + this.taxFees.vat;
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
     * @return {ConsoleTaxCalculator}
     */
    calculate() {
        if (this.calculationMode === BaseMultiCurrencyTaxCalculator.CalculationMode.BasePriceToSalePrice) {
            this.customFee();
            this.sctFee();
            this.vatFee();
        } else if (this.calculationMode === BaseMultiCurrencyTaxCalculator.CalculationMode.SalePriceToBasePrice) {
            this.vatFee();
            this.sctFee();
            this.customFee();
        }

        return this;
    }
}

export default ConsoleTaxCalculator;
