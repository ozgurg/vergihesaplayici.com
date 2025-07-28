import type { CalculationResults, ResultList } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { Registration } from "@/domains/telefon-vergisi-hesaplayici/types.js";

export const buildResultList = (results: CalculationResults, registration: Registration): ResultList => {
    const { prices, taxFees, taxRates } = results;
    const list: ResultList = [];

    // 😊
    list.push({
        key: "taxFree",
        label: "Vergisiz fiyat",
        value: formatMoney(prices.taxFree, "TRY")
    });

    // 😐
    if (registration === Registration.IMPORT) {
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
    } else {
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
        label: "Tahmini satış fiyatı",
        value: formatMoney(prices.taxAdded, "TRY")
    });

    return list;
};
