import type { CalculationResults, ResultList } from "@/domains/kdv-hesaplayici/types.js";

export const buildResultList = (results: CalculationResults): ResultList => {
    const { prices, taxFees, taxRates } = results;
    return [
        {
            key: "taxFree",
            label: "KDV hariç fiyat",
            value: formatNumber(prices.taxFree)
        },
        {
            key: "valueAddedTax",
            label: `KDV (%${taxRates.valueAddedTax})`,
            value: formatNumber(taxFees.valueAddedTax)
        },
        {
            key: "taxAdded",
            label: "KDV dahil fiyat",
            value: formatNumber(prices.taxAdded)
        }
    ];
};
