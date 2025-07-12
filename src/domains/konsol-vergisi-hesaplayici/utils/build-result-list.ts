import type { CalculationResults, ResultList } from "@/domains/konsol-vergisi-hesaplayici/types.js";

export const buildResultList = (results: CalculationResults): ResultList => {
    const { prices, taxFees, taxRates } = results;
    return [
        {
            key: "taxFree",
            label: "Vergisiz fiyat",
            value: formatMoney(prices.taxFree, "TRY")
        },
        {
            key: "customTax",
            label: `Gümrük vergisi (%${taxRates.customTax})`,
            value: formatMoney(taxFees.customTax, "TRY")
        },
        {
            key: "specialConsumptionTax",
            label: `ÖTV (%${taxRates.specialConsumptionTax})`,
            value: formatMoney(taxFees.specialConsumptionTax, "TRY")
        },
        {
            key: "valueAddedTax",
            label: `KDV (%${taxRates.valueAddedTax})`,
            value: formatMoney(taxFees.valueAddedTax, "TRY")
        },
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
