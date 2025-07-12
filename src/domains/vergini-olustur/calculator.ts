import type { CalculationResults, Prices, TaxFees, TaxItem, TaxRates } from "@/domains/vergini-olustur/types.js";
import { BaseAmountMode, RateType } from "@/domains/vergini-olustur/types.js";
import type { ExchangeRates } from "@/types/common.js";

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
        items: []
    };

    private taxRates: TaxRates = {
        total: this.WILL_ASSIGNED_LATER,
        items: this.WILL_ASSIGNED_LATER
    };

    private readonly prices: Prices = {
        taxFree: this.WILL_ASSIGNED_LATER,
        taxAdded: this.WILL_ASSIGNED_LATER
    };

    private basePrice: number;
    private taxItems: TaxItem[];
    private exchangeRates: ExchangeRates;

    public constructor(
        params: {
            basePrice: number;
            taxItems: TaxItem[];
            exchangeRates: ExchangeRates;
        }
    ) {
        this.basePrice = params.basePrice;
        this.taxItems = params.taxItems;
        this.exchangeRates = params.exchangeRates;

        this.prices.taxFree = this.basePrice;
    }

    public calculate(): CalculationResults {
        let currentPrice = this.prices.taxFree;

        for (const _taxItem of this.taxItems) {
            let amount = 0;

            if (_taxItem.rateType === RateType.PERCENT) {
                if (_taxItem.baseAmountMode === BaseAmountMode.BASE_AMOUNT) {
                    amount += calculateTaxFromTaxFreePrice(this.basePrice, _taxItem.rate);
                } else if (_taxItem.baseAmountMode === BaseAmountMode.PREVIOUS_AMOUNT) {
                    amount += calculateTaxFromTaxFreePrice(currentPrice, _taxItem.rate);
                }
            } else if (_taxItem.rateType === RateType.UNIT) {
                amount += _taxItem.rate * this.exchangeRates.rates[_taxItem.rateTypeUnitCurrency];
            }

            currentPrice += amount;

            this.taxFees.items.push({
                taxItem: _taxItem,
                amount
            });
        }

        this.prices.taxAdded = currentPrice;

        this.taxFees.total = this.calculateTotalTaxFee();
        this.taxRates.total = calculateTotalTaxRate(this.taxFees.total, this.prices.taxFree);

        return normalizeCalculatorResults({
            taxFees: this.taxFees,
            taxRates: this.taxRates,
            prices: this.prices
        });
    }

    private calculateTotalTaxFee(): number {
        return this.taxFees.items
            .reduce((_total, _taxFeeItem) => _total + _taxFeeItem.amount, 0);
    }
}
