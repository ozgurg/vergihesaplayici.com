import type { CalculationResults, ResultList } from "@/domains/vergini-olustur/types.js";
import { RateType } from "@/domains/vergini-olustur/types.js";
import { formatNumber } from "@/utils/formatter.js";

export const buildResultList = (results: CalculationResults): ResultList => {
    const { taxFees, taxRates, prices } = results;
    return [
        {
            key: "taxFree",
            label: "Vergisiz fiyat",
            value: formatMoney(prices.taxFree, "TRY")
        },
        ...taxFees.items.map((_taxFeeItem, _index) => {
            const name = `${_taxFeeItem.taxItem.name || `${_index + 1}. vergi`}`;

            if (_taxFeeItem.taxItem.rateType === RateType.PERCENT) {
                return {
                    key: `taxFee`,
                    label: `${name} (%${formatNumber(_taxFeeItem.taxItem.rate)})`,
                    value: formatMoney(_taxFeeItem.amount, "TRY")
                };
            }
            return {
                key: `taxFee`,
                label: `${name} (${formatMoney(_taxFeeItem.taxItem.rate, _taxFeeItem.taxItem.rateTypeUnitCurrency)})`,
                value: formatMoney(_taxFeeItem.amount, "TRY")
            };
        }),
        {
            key: "total",
            label: `Toplam vergi (%${taxRates.total})`,
            value: formatMoney(taxFees.total, "TRY")
        },
        {
            key: "taxAdded",
            label: "Tahmini satış fiyatı",
            value: formatMoney(prices.taxAdded, "TRY")
        }
    ];
};
