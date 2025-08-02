// Calculator
export enum Mode {
    TAX_FREE_TO_TAX_ADDED = "tax-free-to-tax-added",
    TAX_ADDED_TO_TAX_FREE = "tax-added-to-tax-free",
    TAX_TO_TAX_BASE = "tax-to-tax-base"
}

export type TaxFees = {
    total: number;
    valueAddedTax: number;
};

export type TaxRates = TaxFees;

export type Prices = {
    taxFree: number;
    taxAdded: number;
};


// DB
export type Form = {
    mode: Mode;
    price: number;
    rate: number;
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
