import type { CalculationResults, Form, ResultList } from "@/domains/telefon-vergisi/types.js";
import { TAX_ADDED_LABEL_BY_MODE, TAX_FREE_LABEL_BY_MODE } from "@/domains/telefon-vergisi/config.js";

export const buildResultList = (form: Form, results: CalculationResults): ResultList => {
    const { prices, taxFees, taxRates } = results;
    const list: ResultList = [];

    // 😊
    list.push({
        key: "taxFree",
        label: TAX_FREE_LABEL_BY_MODE[form.mode],
        value: formatMoney(prices.taxFree, "TRY")
    });

    // 😐
    if (form.registration === "import") {
        list.push({
            key: "ministryOfCulture",
            label: `Kültür Bakanlığı (%${taxRates.ministryOfCulture})`,
            value: formatMoney(taxFees.ministryOfCulture, "TRY")
        });
        list.push({
            key: "trtImport",
            label: `TRT bandrolü (%${taxRates.trtImport})`,
            value: formatMoney(taxFees.trtImport, "TRY")
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
    } else if (form.registration === "passport") {
        list.push({
            key: "trtPassport",
            label: `TRT bandrolü (${formatMoney(taxRates.trtPassport, "EUR")})`,
            value: formatMoney(taxFees.trtPassport, "TRY")
        });
        list.push({
            key: "registration",
            label: "Kayıt ücreti",
            value: formatMoney(taxFees.registration, "TRY")
        });
    }

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
