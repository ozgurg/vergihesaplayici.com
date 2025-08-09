import type { Form } from "@/domains/gumruk-vergisi-hesaplayici/types.js";

export const TAX_EXEMPTION_WEIGHT_LIMIT_IN_KG = 30;
export const TAX_EXEMPTION_PRICE_LIMIT_IN_EUR = 1_500;

export const DEFAULT_FORM: Form = {
    price: 0,
    currency: "TRY",
    isOverTaxExemptionWeightLimit: false,
    isOverTaxExemptionPriceLimit: false,
    isPrintedOnly: false,
    isSpecialConsumptionTaxed: false,
    isFromEU: false,
    isShippingIncluded: true,
    extraCustomTaxPercent: 0
};

export const LAST_UPDATE = new Date("Wed Aug 02 2025 12:00:00 GMT+0300 (GMT+03:00)");
