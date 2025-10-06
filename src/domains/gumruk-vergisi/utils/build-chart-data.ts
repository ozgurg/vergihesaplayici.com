import type { CalculationResults, ChartData, Form } from "@/domains/gumruk-vergisi/types.js";

export const buildChartData = (_: Form, results: CalculationResults): ChartData => {
    const { prices, taxFees } = results;

    const taxRatesData = [];
    if (taxFees.customTax > 0) {
        taxRatesData.push({
            label: "Gümrük vergisi",
            value: taxFees.customTax
        });
    }
    if (taxFees.additionalCustomTax > 0) {
        taxRatesData.push({
            label: "Ek gümrük vergisi",
            value: taxFees.additionalCustomTax
        });
    }
    if (taxFees.extraCustomTax > 0) {
        taxRatesData.push({
            label: "İlave gümrük vergisi",
            value: taxFees.extraCustomTax
        });
    }
    if (taxFees.specialConsumptionTax > 0) {
        taxRatesData.push({
            label: "ÖTV",
            value: taxFees.specialConsumptionTax
        });
    }
    if (taxFees.shipping > 0) {
        taxRatesData.push({
            label: "Emsal navlun gideri",
            value: taxFees.shipping
        });
    }
    if (taxFees.submission > 0) {
        taxRatesData.push({
            label: "Gümrüğe sunma ücreti",
            value: taxFees.submission
        });
    }
    if (taxFees.stampDuty > 0) {
        taxRatesData.push({
            label: "Damga vergisi",
            value: taxFees.stampDuty
        });
    }

    const totalData = [];
    totalData.push({
        label: "Sipariş",
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
