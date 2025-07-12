import type { CalculationResults, Prices, TaxFees, TaxRates } from "@/domains/konsol-vergisi-hesaplayici/types.js";

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
        customTax: this.WILL_ASSIGNED_LATER, // TRY | "Gümrük vergisi"
        specialConsumptionTax: this.WILL_ASSIGNED_LATER, // TRY | "Özel Tüketim Vergisi (ÖTV)"
        valueAddedTax: this.WILL_ASSIGNED_LATER // TRY | "Katma Değer Vergisi (KDV)"
    };

    private taxRates: TaxRates = {
        total: this.WILL_ASSIGNED_LATER,
        customTax: 20, // TRY | "Gümrük vergisi"
        specialConsumptionTax: 20, // TRY | "Özel Tüketim Vergisi (ÖTV)"
        valueAddedTax: 20 // TRY | "Katma Değer Vergisi (KDV)"
    };

    private readonly prices: Prices = {
        taxFree: this.WILL_ASSIGNED_LATER,
        taxAdded: this.WILL_ASSIGNED_LATER
    };

    private price: number;
    private readonly calculateFromTaxAddedPrice: boolean;

    public constructor(
        params: {
            price: number
        },
        options: {
            calculateFromTaxAddedPrice: boolean
        }
    ) {
        this.price = params.price;
        this.calculateFromTaxAddedPrice = options.calculateFromTaxAddedPrice;

        if (this.calculateFromTaxAddedPrice) {
            this.prices.taxAdded = params.price;
        } else {
            this.prices.taxFree = params.price;
        }
    }

    public calculate(): CalculationResults {
        this.calculateTax_customTax();
        this.calculateTax_specialConsumptionTax();
        this.calculateTax_valueAddedTax();

        if (this.calculateFromTaxAddedPrice) {
            this.prices.taxFree = this.price;
        } else {
            this.prices.taxAdded = this.price;
        }

        this.taxFees.total = this.calculateTotalTaxFee();
        this.taxRates.total = calculateTotalTaxRate(this.taxFees.total, this.prices.taxFree);

        return normalizeCalculatorResults({
            taxFees: this.taxFees,
            taxRates: this.taxRates,
            prices: this.prices
        });
    }

    private calculatePrice(price: number): void {
        if (this.calculateFromTaxAddedPrice) {
            this.price -= price;
        } else {
            this.price += price;
        }
    }

    private calculateTax(price: number, rate: number): number {
        return this.calculateFromTaxAddedPrice ?
            calculateTaxFromTaxAddedPrice(price, rate) :
            calculateTaxFromTaxFreePrice(price, rate);
    }

    private calculateTotalTaxFee(): number {
        return this.taxFees.customTax +
            this.taxFees.specialConsumptionTax +
            this.taxFees.valueAddedTax;
    }

    private calculateTax_customTax(): void {
        this.taxFees.customTax = this.calculateTax(this.price, this.taxRates.customTax);
        this.calculatePrice(this.taxFees.customTax);
    }

    private calculateTax_specialConsumptionTax(): void {
        this.taxFees.specialConsumptionTax = this.calculateTax(this.price, this.taxRates.specialConsumptionTax);
        this.calculatePrice(this.taxFees.specialConsumptionTax);
    }

    private calculateTax_valueAddedTax(): void {
        this.taxFees.valueAddedTax = this.calculateTax(this.price, this.taxRates.valueAddedTax);
        this.calculatePrice(this.taxFees.valueAddedTax);
    }
}
