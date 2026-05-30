import type { CalculationResults, Form, ResultList, TaxStepId } from "@/domains/arac-vergisi/types.js";
import { TAX_ADDED_LABEL_BY_MODE, TAX_FREE_LABEL_BY_MODE } from "@/domains/arac-vergisi/config.js";

export const buildResultList = (form: Form, results: CalculationResults): ResultList => {
    const { prices, taxFees, taxRates, steps } = results;
    const list: ResultList = [];

    const getStepDetails = (stepId: TaxStepId) => {
        const step = steps[stepId];
        const isReversed = form.mode === "tax-added-to-tax-free";
        return [
            { label: "Matrah", value: formatMoney(step.baseAmount, "TRY") },
            { label: "Oran", value: `%${step.rate}` },
            { label: "Vergi tutarı", value: formatMoney(step.taxAmount, "TRY") },
            {
                label: isReversed ? "Geriye dönük tutar değişimi" : "Birikimli tutar değişimi",
                value: `${formatMoney(step.amountBeforeTax, "TRY")} → ${formatMoney(step.amountAfterTax, "TRY")}`
            }
        ];
    };

    // 😊
    list.push({
        key: "taxFree",
        label: TAX_FREE_LABEL_BY_MODE[form.mode],
        value: formatMoney(prices.taxFree, "TRY")
    });

    // 😐
    list.push({
        key: "trt",
        label: `TRT bandrolü (%${taxRates.trt})`,
        value: formatMoney(taxFees.trt, "TRY"),
        details: getStepDetails("trt")
    });
    list.push({
        key: "specialConsumptionTax",
        label: `ÖTV (%${taxRates.specialConsumptionTax})`,
        value: formatMoney(taxFees.specialConsumptionTax, "TRY"),
        details: getStepDetails("specialConsumptionTax")
    });
    list.push({
        key: "valueAddedTax",
        label: `KDV (%${taxRates.valueAddedTax})`,
        value: formatMoney(taxFees.valueAddedTax, "TRY"),
        details: getStepDetails("valueAddedTax")
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
