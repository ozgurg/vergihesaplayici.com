import type { CalculationResults, ChartData, Form } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { Registration } from "@/domains/telefon-vergisi-hesaplayici/types.js";

export const buildChartData = (form: Form, results: CalculationResults): ChartData => {
    const { prices, taxFees } = results;

    const taxRatesData = [];
    if (form.registration === Registration.IMPORT) {
        taxRatesData.push({
            label: "Kültür Bakanlığı",
            value: taxFees.ministryOfCulture
        });
        taxRatesData.push({
            label: "TRT bandrolü",
            value: taxFees.trtImport
        });
        taxRatesData.push({
            label: "ÖTV",
            value: taxFees.specialConsumptionTax
        });
        taxRatesData.push({
            label: "KDV",
            value: taxFees.valueAddedTax
        });
    } else if (form.registration === Registration.PASSPORT) {
        taxRatesData.push({
            label: "TRT bandrolü",
            value: taxFees.trtPassport
        });
        taxRatesData.push({
            label: "Kayıt ücreti",
            value: taxFees.registration
        });
    }

    const totalData = [];
    totalData.push({
        label: "Telefon",
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
