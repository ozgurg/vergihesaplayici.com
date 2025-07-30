import type { CalculationResults, Prices, TaxFees, TaxItem, TaxRates } from "@/domains/vergini-olustur/types.js";
import { BaseAmountMode, RateType } from "@/domains/vergini-olustur/types.js";
import type { ExchangeRates } from "@/types/common.js";

export class Calculator {
    private taxFees: TaxFees = {
        total: 0,
        items: []
    };

    private taxRates: TaxRates = {
        total: 0,
        items: 0
    };

    private readonly prices: Prices = {
        taxFree: 0,
        taxAdded: 0
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
