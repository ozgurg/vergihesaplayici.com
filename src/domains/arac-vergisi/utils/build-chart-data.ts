import type { CalculationResults, ChartData, Form } from "@/domains/arac-vergisi/types.js";

export const buildChartData = (_: Form, results: CalculationResults): ChartData => {
    const { prices, taxFees } = results;

    const taxRatesData = [];
    taxRatesData.push({
        label: "TRT bandrolü",
        value: taxFees.trt
    });
    taxRatesData.push({
        label: "ÖTV",
        value: taxFees.specialConsumptionTax
    });
    taxRatesData.push({
        label: "KDV",
        value: taxFees.valueAddedTax
    });

    const totalData = [];
    totalData.push({
        label: "Araç",
        value: prices.taxFree
    });
    totalData.push({
        label: "Vergiler",
        value: taxFees.total
    });

    return {
        taxRates: taxRatesData,
        total: totalData
    };
};
