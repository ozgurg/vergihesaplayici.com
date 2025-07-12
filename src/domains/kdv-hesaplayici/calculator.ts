import type { CalculationResults, Prices, TaxFees, TaxRates } from "@/domains/kdv-hesaplayici/types.js";
import { Mode } from "@/domains/kdv-hesaplayici/types.js";

export class Calculator {
    // Most of the calculation values will be assigned when `calculate()` is called.
    // Initially, I set them to `WILL_ASSIGNED_LATER`, but why not just assign `0`?
    // Because in some calculations, `0` can have a specific meaning.
    // Even if the value is `0`, the name will clarify its purpose,
    // making sure there's no confusion unless `0` really means something.
    // I also don't want to use `null` because handling it in TypeScript adds unnecessary complexity.
    private readonly WILL_ASSIGNED_LATER: number = 0;

    private taxFees: TaxFees = {
        total: this.WILL_ASSIGNED_LATER,
        valueAddedTax: this.WILL_ASSIGNED_LATER
    };

    private taxRates: TaxRates = {
        total: this.WILL_ASSIGNED_LATER,
        valueAddedTax: this.WILL_ASSIGNED_LATER
    };

    private readonly prices: Prices = {
        taxFree: this.WILL_ASSIGNED_LATER,
        taxAdded: this.WILL_ASSIGNED_LATER
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

        if (this.mode === Mode.TAX_FREE_TO_TAX_ADDED) {
            this.prices.taxFree = this.price;
        } else if (this.mode === Mode.TAX_ADDED_TO_TAX_FREE) {
            this.prices.taxAdded = this.price;
        } else if (this.mode === Mode.TAX_TO_TAX_BASE) {
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

    private calculateTax_valueAddedTax(): void {
        this.taxRates.valueAddedTax = this.rate;

        if (this.mode === Mode.TAX_FREE_TO_TAX_ADDED) {
            this.taxFees.valueAddedTax = calculateTaxFromTaxFreePrice(this.price, this.taxRates.valueAddedTax);
            this.price += this.taxFees.valueAddedTax;
            this.prices.taxAdded = this.price;
        } else if (this.mode === Mode.TAX_ADDED_TO_TAX_FREE) {
            this.taxFees.valueAddedTax = calculateTaxFromTaxAddedPrice(this.price, this.taxRates.valueAddedTax);
            this.price -= this.taxFees.valueAddedTax;
            this.prices.taxFree = this.price;
        } else if (this.mode === Mode.TAX_TO_TAX_BASE) {
            this.prices.taxFree = (this.taxFees.valueAddedTax * 100) / this.rate;
            this.prices.taxAdded = this.prices.taxFree + this.taxFees.valueAddedTax;
        }
    }
}
