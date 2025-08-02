import type { CurrencyCode } from "@/types/common.js";


// Calculator
export enum BaseAmountMode {
    BASE_AMOUNT = "base-amount",
    PREVIOUS_AMOUNT = "previous-amount"
}

export enum RateType {
    PERCENT = "percent",
    UNIT = "unit"
}

export type TaxItem = {
    id: number;
    name: string;
    rate: number;
    rateType: RateType;
    rateTypeUnitCurrency: CurrencyCode;
    baseAmountMode: BaseAmountMode;
};

export type TaxFeeItem = {
    taxItem: TaxItem;
    amount: number;
}

export type TaxFees = {
    total: number;
    items: TaxFeeItem[];
};

export type TaxRates = {
    total: TaxFees["total"];
    items: number;
};

export type Prices = {
    taxFree: number;
    taxAdded: number;
};


// DB
export type Form<TaxItem> = {
    basePrice: number;
    taxItems: TaxItem[];
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
};

export type ResultList = ResultListItem[];
