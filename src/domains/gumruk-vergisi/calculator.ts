import type { CalculationResults, Prices, TaxFees, TaxRates } from "@/domains/gumruk-vergisi/types.js";

export const SHIPPING_PRICE_IN_EUR = 3;

export class Calculator {
    private taxFees: TaxFees = {
        total: 0,
        customTax: 0,
        additionalCustomTax: 0,
        extraCustomTax: 0,
        specialConsumptionTax: 0,
        shipping: 0,
        submission: 0,
        stampDuty: 0
    };

    private taxRates: TaxRates = {
        total: 0,
        customTax: 0,
        additionalCustomTax: 0,
        extraCustomTax: 0,
        specialConsumptionTax: 0,
        shipping: 0,
        submission: 0,
        stampDuty: 0
    };

    private readonly prices: Prices = {
        taxFree: 0,
        taxAdded: 0
    };

    private price: number;
    private readonly eurToTryCurrency: number;
    private readonly isOverTaxExemptionWeightLimit: boolean;
    private readonly isOverTaxExemptionPriceLimit: boolean;
    private readonly isPrintedOnly: boolean;
    private readonly isSpecialConsumptionTaxed: boolean;
    private readonly isFromEU: boolean;
    private readonly isShippingIncluded: boolean;
    private readonly extraCustomTaxPercent: number = 0;

    public constructor(
        params: {
            price: number,
            eurToTryCurrency: number,
            isOverTaxExemptionWeightLimit: boolean,
            isOverTaxExemptionPriceLimit: boolean,
            isPrintedOnly: boolean,
            isSpecialConsumptionTaxed: boolean,
            isFromEU: boolean,
            isShippingIncluded: boolean,
            extraCustomTaxPercent: number
        }
    ) {
        this.price = params.price;
        this.eurToTryCurrency = params.eurToTryCurrency;
        this.isOverTaxExemptionWeightLimit = params.isOverTaxExemptionWeightLimit;
        this.isOverTaxExemptionPriceLimit = params.isOverTaxExemptionPriceLimit;
        this.isPrintedOnly = params.isPrintedOnly;
        this.isSpecialConsumptionTaxed = params.isSpecialConsumptionTaxed;
        this.isFromEU = params.isFromEU;
        this.isShippingIncluded = params.isShippingIncluded;
        this.extraCustomTaxPercent = params.extraCustomTaxPercent;

        this.prices.taxFree = this.price;
        this.prices.taxAdded = this.price;
    }

    public calculate(): CalculationResults {
        const isExemptionsViolated = this.isOverTaxExemptionWeightLimit || this.isOverTaxExemptionPriceLimit;
        if (isExemptionsViolated || !this.isPrintedOnly) {
            this.calculateTax_customTax();

            if (isExemptionsViolated) {
                this.calculateTax_additionalCustomTax();
            }

            this.calculateTax_extraCustomTax();

            if (this.isSpecialConsumptionTaxed) {
                this.calculateTax_specialConsumptionTax();
            }
        }

        if (!this.isShippingIncluded) {
            this.calculateTax_shipping();
        }

        this.calculateTax_submission();
        this.calculateTax_stampDuty();


        this.prices.taxAdded = this.price;

        this.taxFees.total = this.calculateTotalTaxFee();
        this.taxRates.total = calculateTotalTaxRate(this.taxFees.total, this.prices.taxFree);

        return normalizeCalculatorResults({
            taxFees: this.taxFees,
            taxRates: this.taxRates,
            prices: this.prices
        });
    }

    private calculatePrice(price: number): void {
        this.price += price;
    }

    private calculateTax(price: number, rate: number): number {
        return calculateTaxFromTaxFreePrice(price, rate);
    }

    private calculateTotalTaxFee(): number {
        return this.taxFees.customTax +
            this.taxFees.additionalCustomTax +
            this.taxFees.specialConsumptionTax +
            this.taxFees.shipping +
            this.taxFees.submission +
            this.taxFees.stampDuty;
    }

    // "Gümrük vergisi" | TRY | "percent" | BaseAmountMode.BASE_AMOUNT
    private calculateTax_customTax(): void {
        this.taxRates.customTax = this.isFromEU ? 30 : 60;
        this.taxFees.customTax = this.calculateTax(this.prices.taxFree, this.taxRates.customTax);
        this.calculatePrice(this.taxFees.customTax);
    }

    // "Ek gümrük vergisi" | TRY | "percent" | BaseAmountMode.BASE_AMOUNT
    private calculateTax_additionalCustomTax(): void {
        this.taxRates.additionalCustomTax = 48;
        this.taxFees.additionalCustomTax = this.calculateTax(this.prices.taxFree, this.taxRates.additionalCustomTax);
        this.calculatePrice(this.taxFees.additionalCustomTax);
    }

    // "İlave gümrük vergisi" | TRY | "percent" | BaseAmountMode.BASE_AMOUNT
    private calculateTax_extraCustomTax(): void {
        this.taxRates.extraCustomTax = this.extraCustomTaxPercent;
        this.taxFees.extraCustomTax = this.calculateTax(this.prices.taxFree, this.taxRates.extraCustomTax);
        this.calculatePrice(this.taxFees.extraCustomTax);
    }

    // "Özel Tüketim Vergisi (ÖTV)" | TRY | "percent" | BaseAmountMode.PREVIOUS_AMOUNT
    private calculateTax_specialConsumptionTax(): void {
        this.taxRates.specialConsumptionTax = 20;
        this.taxFees.specialConsumptionTax = this.calculateTax(this.price, this.taxRates.specialConsumptionTax);
        this.calculatePrice(this.taxFees.specialConsumptionTax);
    }

    // "Emsal navlun gideri" | EUR | "unit"
    private calculateTax_shipping(): void {
        this.taxRates.shipping = SHIPPING_PRICE_IN_EUR;
        this.taxFees.shipping = this.taxRates.shipping * this.eurToTryCurrency;
        this.calculatePrice(this.taxFees.shipping);
    }

    // "Gümrüğe sunma ücreti" | TRY | "unit"
    private calculateTax_submission(): void {
        this.taxRates.submission = 46.6;
        this.taxFees.submission = this.taxRates.submission;
        this.calculatePrice(this.taxFees.submission);
    }

    // "Damga vergisi" | TRY | "unit"
    private calculateTax_stampDuty(): void {
        this.taxRates.stampDuty = 4.8;
        this.taxFees.stampDuty = this.taxRates.stampDuty;
        this.calculatePrice(this.taxFees.stampDuty);
    }
}
