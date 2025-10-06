import type { CalculationResults, Form, ResultList, TaxItem } from "@/domains/vergini-olustur/types.js";
import { RateType } from "@/domains/vergini-olustur/types.js";
import { normalizePrice } from "@/utils/formatter.js";

export const buildResultList = (_: Form<TaxItem>, results: CalculationResults): ResultList => {
    const { taxFees, taxRates, prices } = results;
    const list: ResultList = [];

    // 😊
    list.push({
        key: "taxFree",
        label: "Vergisiz tutar",
        value: formatMoney(prices.taxFree, "TRY")
    });

    // 😐
    for (const [_index, _taxFeeItem] of taxFees.items.entries()) {
        const name = `${_taxFeeItem.taxItem.name || `${_index + 1}. vergi`}`;

        if (_taxFeeItem.taxItem.rateType === RateType.PERCENT) {
            list.push({
                key: `taxFee-${_index}`,
                label: `${name} (%${normalizePrice(_taxFeeItem.taxItem.rate)})`, // FIXME: `rate` is not a price, so using `normalizePrice` feels misleading
                value: formatMoney(_taxFeeItem.amount, "TRY")
            });
        } else if (_taxFeeItem.taxItem.rateType === RateType.UNIT) {
            list.push({
                key: `taxFee-${_index}`,
                label: `${name} (${formatMoney(_taxFeeItem.taxItem.rate, _taxFeeItem.taxItem.rateTypeUnitCurrency)})`,
                value: formatMoney(_taxFeeItem.amount, "TRY")
            });
        }
    }

    // 😔
    list.push({
        key: "total",
        label: `Toplam vergi (%${taxRates.total})`,
        value: formatMoney(taxFees.total, "TRY")
    });
    list.push({
        key: "taxAdded",
        label: "Vergili tutar",
        value: formatMoney(prices.taxAdded, "TRY")
    });

    return list;
};
