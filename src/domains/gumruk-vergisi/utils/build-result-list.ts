import type { CalculationResults, Form, ResultList } from "@/domains/gumruk-vergisi/types.js";

export const buildResultList = (form: Form, results: CalculationResults): ResultList => {
    const { prices, taxFees, taxRates } = results;
    const list: ResultList = [];

    // 😊
    list.push({
        key: "taxFree",
        label: "Sipariş tutarı",
        value: formatMoney(prices.taxFree, "TRY")
    });

    // 😐
    list.push({
        key: "customTax",
        label: `Gümrük vergisi (%${taxRates.customTax})`,
        value: formatMoney(taxFees.customTax, "TRY"),
        isMuted: taxFees.customTax <= 0
    });
    list.push({
        key: "additionalCustomTax",
        label: `Ek gümrük vergisi (%${taxRates.additionalCustomTax})`,
        value: formatMoney(taxFees.additionalCustomTax, "TRY"),
        isMuted: taxFees.additionalCustomTax <= 0
    });
    if (form.extraCustomTaxPercent > 0) {
        list.push({
            key: "extraCustomTax",
            label: `İlave gümrük vergisi (%${taxRates.extraCustomTax})`,
            value: formatMoney(taxFees.extraCustomTax, "TRY")
        });
    }
    if (form.isSpecialConsumptionTaxed) {
        list.push({
            key: "specialConsumptionTax",
            label: `ÖTV (%${taxRates.specialConsumptionTax})`,
            value: formatMoney(taxFees.specialConsumptionTax, "TRY"),
            isMuted: taxFees.specialConsumptionTax <= 0
        });
    }
    if (!form.isShippingIncluded) {
        list.push({
            key: "shipping",
            label: `Emsal navlun gideri (${formatMoney(taxRates.shipping, "EUR")})`,
            value: formatMoney(taxFees.shipping, "TRY"),
            isMuted: taxFees.shipping <= 0
        });
    }
    list.push({
        key: "submission",
        label: "Gümrüğe sunma ücreti",
        value: formatMoney(taxFees.submission, "TRY")
    });
    list.push({
        key: "stampDuty",
        label: "Damga vergisi",
        value: formatMoney(taxFees.stampDuty, "TRY")
    });

    // 😔
    list.push({
        key: "total",
        label: `Toplam vergi (%${taxRates.total})`,
        value: formatMoney(taxFees.total, "TRY")
    });
    list.push({
        key: "taxAdded",
        label: "Tahmini vergili fiyat",
        value: formatMoney(prices.taxAdded, "TRY")
    });

    return list;
};
