import type { CalculationResults, Form, ResultList } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import { TAX_ADDED_LABEL_BY_MODE, TAX_FREE_LABEL_BY_MODE } from "@/domains/konsol-vergisi-hesaplayici/config.js";

export const buildResultList = (results: CalculationResults, form: Form): ResultList => {
    const { prices, taxFees, taxRates } = results;
    const list: ResultList = [];

    // 😊
    list.push({
        key: "taxFree",
        label: TAX_FREE_LABEL_BY_MODE[form.mode],
        value: formatMoney(prices.taxFree, "TRY")
    });

    // 😐
    list.push({
        key: "customTax",
        label: `Gümrük vergisi (%${taxRates.customTax})`,
        value: formatMoney(taxFees.customTax, "TRY")
    });
    list.push({
        key: "specialConsumptionTax",
        label: `ÖTV (%${taxRates.specialConsumptionTax})`,
        value: formatMoney(taxFees.specialConsumptionTax, "TRY")
    });
    list.push({
        key: "valueAddedTax",
        label: `KDV (%${taxRates.valueAddedTax})`,
        value: formatMoney(taxFees.valueAddedTax, "TRY")
    });

    // 😔
    list.push({
        key: "total",
        label: `Toplam vergi (%${taxRates.total})`,
        value: formatMoney(taxFees.total, "TRY")
    });
    list.push({
        key: "taxAdded",
        label: TAX_ADDED_LABEL_BY_MODE[form.mode],
        value: formatMoney(prices.taxAdded, "TRY")
    });

    return list;
};
