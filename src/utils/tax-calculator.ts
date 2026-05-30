export class TaxCalculator<TaxId extends string = string> {
    readonly #originalPrice: number;
    readonly #mode: Mode;
    readonly #taxSteps: TaxStep<TaxId>[];

    public constructor({ price, mode, taxSteps }: {
        price: number;
        mode: Mode;
        taxSteps: TaxStep<TaxId>[];
    }) {
        this.#originalPrice = price;
        this.#mode = mode;
        this.#taxSteps = taxSteps;
    }

    public calculate(): TaxCalculation<TaxId> {
        const isReversed = this.#mode === "tax-added-to-tax-free";

        let currentAmount = this.#originalPrice;
        let totalTax = 0;
        const steps = {} as { [key in TaxId]: TaxCalculationStep<TaxId> };

        if (isReversed) {
            // Reverse: Tax Added -> Tax Free
            for (let i = this.#taxSteps.length - 1; i >= 0; i--) {
                // oxlint-disable-next-line typescript/no-non-null-assertion
                const step = this.#taxSteps[i]!;

                const isFixed = step.type === "fixed";
                const baseAmount = currentAmount;

                const rate = step.reverseRateResolver
                    ? step.reverseRateResolver(this.#originalPrice)
                    : this.getTaxRate(step.rate, currentAmount);

                const taxAmount = isFixed
                    ? rate
                    : this.calculateTaxFromTaxAddedPrice(baseAmount, rate);

                steps[step.id] = {
                    id: step.id,
                    name: step.name,
                    rate,
                    baseAmount,
                    taxAmount,
                    amountBeforeTax: currentAmount,
                    amountAfterTax: currentAmount - taxAmount
                };

                totalTax += taxAmount;
                currentAmount -= taxAmount;
            }
        } else {
            // Forward: Tax Free -> Tax Added
            for (const step of this.#taxSteps) {
                const baseAmount = step.baseMode === "base-amount" ?
                    this.#originalPrice :
                    currentAmount;
                const isFixed = step.type === "fixed";

                const rate = this.getTaxRate(step.rate, currentAmount);

                const taxAmount = isFixed
                    ? rate
                    : this.calculateTaxFromTaxFreePrice(baseAmount, rate);

                steps[step.id] = {
                    id: step.id,
                    name: step.name,
                    rate,
                    baseAmount,
                    taxAmount,
                    amountBeforeTax: currentAmount,
                    amountAfterTax: currentAmount + taxAmount
                };

                totalTax += taxAmount;
                currentAmount += taxAmount;
            }
        }

        const taxFreePrice = isReversed ? currentAmount : this.#originalPrice;
        const taxAddedPrice = isReversed ? this.#originalPrice : currentAmount;
        const totalTaxRate = (totalTax / taxFreePrice) * 100;
        return {
            taxFreePrice,
            taxAddedPrice,
            totalTax,
            totalTaxRate,
            steps
        };
    }

    private getTaxRate(rate: TaxStepRate, currentAmount: number): number {
        return typeof rate === "function" ?
            rate(currentAmount) :
            rate;
    }

    private calculateTaxFromTaxFreePrice(baseAmount: number, ratePercent: number): number {
        return baseAmount * (ratePercent / 100);
    }

    private calculateTaxFromTaxAddedPrice(taxAddedAmount: number, ratePercent: number): number {
        return (taxAddedAmount * ratePercent) / (100 + ratePercent);
    }
}

export type BaseAmountMode = "base-amount" | "previous-amount" | "tax-free-amount";

export type Mode = "tax-added-to-tax-free" | "tax-free-to-tax-added";

export type TaxStepRate = ((amount: number) => number) | number;

export type TaxStepType = "percentage" | "fixed";

export type TaxStep<TaxId extends string = string> = {
    id: TaxId;
    name: string;
    rate: TaxStepRate;
    baseMode: BaseAmountMode;
    type: TaxStepType;
    rateBaseMode?: BaseAmountMode;
    reverseRateResolver?: (price: number) => number;
};

export type TaxCalculationStep<TaxId extends string = string> = {
    id: TaxId;
    name: string;
    rate: number;
    baseAmount: number;
    taxAmount: number;
    amountBeforeTax: number;
    amountAfterTax: number;
};

export type TaxCalculation<TaxId extends string = string> = {
    taxFreePrice: number;
    taxAddedPrice: number;
    totalTax: number;
    totalTaxRate: number;
    steps: {
        [key in TaxId]: TaxCalculationStep<TaxId>
    };
};
