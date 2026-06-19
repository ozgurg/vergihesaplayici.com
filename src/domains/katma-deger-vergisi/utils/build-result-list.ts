import type { CalculationResults, Form, ResultList } from "@/domains/katma-deger-vergisi/types.js";

export const buildResultList = (_: Form, results: CalculationResults): ResultList => {
    const { prices, taxFees, taxRates } = results;
    const list: ResultList = [];

    // 😊
    list.push({
        key: "taxFree",
        label: "KDV hariç tutar",
        value: formatNumber(prices.taxFree)
    });

    // 😐
    list.push({
        key: "valueAddedTax",
        label: `KDV (%${taxRates.valueAddedTax})`,
        value: formatNumber(taxFees.valueAddedTax)
    });

    // 😔
    list.push({
        key: "taxAdded",
        label: "KDV dahil tutar",
        value: formatNumber(prices.taxAdded)
    });

    return list;
};
