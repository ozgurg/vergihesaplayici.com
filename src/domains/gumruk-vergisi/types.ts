import type { CurrencyCode } from "@/types/common.js";


// Calculator
export type TaxFees = {
    total: number;
    customTax: number;
    additionalCustomTax: number;
    extraCustomTax: number;
    specialConsumptionTax: number;
    shipping: number;
    submission: number;
    stampDuty: number;
};

export type TaxRates = TaxFees;

export type Prices = {
    taxFree: number;
    taxAdded: number;
};


// DB
export type Form = {
    price: number;
    currency: CurrencyCode;
    isOverTaxExemptionWeightLimit: boolean;
    isOverTaxExemptionPriceLimit: boolean;
    isPrintedOnly: boolean;
    isSpecialConsumptionTaxed: boolean;
    isFromEU: boolean;
    isShippingIncluded: boolean;
    extraCustomTaxPercent: number;
};


// Utils
export type {
    ScreenshotData
} from "@/components/calculator-share-modal/calculator-share-modal-screenshot-tab-screenshot.vue";

export type CalculationResults = {
    taxFees: TaxFees;
    taxRates: TaxRates;
    prices: Prices;
};

export type ResultListItem = {
    key: string;
    label: string;
    value: string;
    isMuted?: boolean;
};

export type ResultList = ResultListItem[];
