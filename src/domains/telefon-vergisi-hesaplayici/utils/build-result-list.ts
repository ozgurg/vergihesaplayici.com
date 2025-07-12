import type { CalculationResults, ResultList } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { Registration } from "@/domains/telefon-vergisi-hesaplayici/types.js";

export const buildResultList = (results: CalculationResults, registration: Registration): ResultList => {
    const { prices, taxFees, taxRates } = results;
    return [
        {
            key: "taxFree",
            label: "Vergisiz fiyat",
            value: formatMoney(prices.taxFree, "TRY")
        },
        ...(() => {
            if (registration === Registration.IMPORT) {
                return [
                    {
                        key: "ministryOfCulture",
                        label: `Kültür Bakanlığı (%${taxRates.ministryOfCulture})`,
                        value: formatMoney(taxFees.ministryOfCulture, "TRY")
                    },
                    {
                        key: "trtImport",
                        label: `TRT bandrolü (%${taxRates.trtImport})`,
                        value: formatMoney(taxFees.trtImport, "TRY")
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
                    }
                ];
            }
            return [
                {
                    key: "trtPassport",
                    label: `TRT bandrolü (${formatMoney(taxRates.trtPassport, "EUR")})`,
                    value: formatMoney(taxFees.trtPassport, "TRY")
                },
                {
                    key: "registration",
                    label: "Kayıt ücreti",
                    value: formatMoney(taxFees.registration, "TRY")
                }
            ];
        })(),
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
