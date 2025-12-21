import type {
    CalculationResults,
    Mode,
    Prices,
    TaxFees,
    TaxRates
} from "@/domains/konsol-vergisi-hesaplayici/types.js";

export class Calculator {
    private taxFees: TaxFees = {
        total: 0,
        customTax: 0,
        specialConsumptionTax: 0,
        valueAddedTax: 0
    };

    private taxRates: TaxRates = {
        total: 0,
        customTax: 0,
        specialConsumptionTax: 0,
        valueAddedTax: 0
    };

    private readonly prices: Prices = {
        taxFree: 0,
        taxAdded: 0
    };

    private price: number;
    private readonly calculateFromTaxAddedPrice: boolean;

    public constructor(
        params: {
            price: number
        },
        options: {
            mode: Mode
        }
    ) {
        this.price = params.price;
        this.calculateFromTaxAddedPrice = options.mode === "tax-added-to-tax-free";

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

    // "Gümrük vergisi" | TRY | "percent" | "previous-amount"
    private calculateTax_customTax(): void {
        this.taxRates.customTax = 20;
        this.taxFees.customTax = this.calculateTax(this.price, this.taxRates.customTax);
        this.calculatePrice(this.taxFees.customTax);
    }

    // "Özel Tüketim Vergisi (ÖTV)" | TRY | "percent" | "previous-amount"
    private calculateTax_specialConsumptionTax(): void {
        this.taxRates.specialConsumptionTax = 20;
        this.taxFees.specialConsumptionTax = this.calculateTax(this.price, this.taxRates.specialConsumptionTax);
        this.calculatePrice(this.taxFees.specialConsumptionTax);
    }

    // "Katma Değer Vergisi (KDV)" | TRY | "percent" | "previous-amount"
    private calculateTax_valueAddedTax(): void {
        this.taxRates.valueAddedTax = 20;
        this.taxFees.valueAddedTax = this.calculateTax(this.price, this.taxRates.valueAddedTax);
        this.calculatePrice(this.taxFees.valueAddedTax);
    }
}
