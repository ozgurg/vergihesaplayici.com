import type { CalculationResults, Mode, Prices, TaxFees, TaxRates } from "@/domains/kdv-hesaplayici/types.js";

export class Calculator {
    private taxFees: TaxFees = {
        total: 0,
        valueAddedTax: 0
    };

    private taxRates: TaxRates = {
        total: 0,
        valueAddedTax: 0
    };

    private readonly prices: Prices = {
        taxFree: 0,
        taxAdded: 0
    };

    private mode: Mode;
    private price: number;
    private rate: number;

    public constructor(
        params: {
            mode: Mode,
            price: number,
            rate: number
        }
    ) {
        this.mode = params.mode;
        this.price = params.price;
        this.rate = params.rate;

        if (this.mode === "tax-free-to-tax-added") {
            this.prices.taxFree = this.price;
        } else if (this.mode === "tax-added-to-tax-free") {
            this.prices.taxAdded = this.price;
        } else if (this.mode === "tax-to-tax-base") {
            this.taxFees.valueAddedTax = this.price;
        }
    }

    public calculate(): CalculationResults {
        this.calculateTax_valueAddedTax();


        this.taxFees.total = this.calculateTotalTaxFee();
        this.taxRates.total = calculateTotalTaxRate(this.taxFees.total, this.prices.taxFree);

        return normalizeCalculatorResults({
            taxFees: this.taxFees,
            taxRates: this.taxRates,
            prices: this.prices
        });
    }

    private calculateTotalTaxFee(): number {
        return this.taxFees.valueAddedTax;
    }

    // "Katma Değer Vergisi (KDV)"
    private calculateTax_valueAddedTax(): void {
        this.taxRates.valueAddedTax = this.rate;

        if (this.mode === "tax-free-to-tax-added") {
            this.taxFees.valueAddedTax = calculateTaxFromTaxFreePrice(this.price, this.taxRates.valueAddedTax);
            this.price += this.taxFees.valueAddedTax;
            this.prices.taxAdded = this.price;
        } else if (this.mode === "tax-added-to-tax-free") {
            this.taxFees.valueAddedTax = calculateTaxFromTaxAddedPrice(this.price, this.taxRates.valueAddedTax);
            this.price -= this.taxFees.valueAddedTax;
            this.prices.taxFree = this.price;
        } else if (this.mode === "tax-to-tax-base") {
            this.prices.taxFree = (this.taxFees.valueAddedTax * 100) / this.rate;
            this.prices.taxAdded = this.prices.taxFree + this.taxFees.valueAddedTax;
        }
    }
}
