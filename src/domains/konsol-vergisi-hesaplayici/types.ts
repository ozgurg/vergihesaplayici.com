import type { CurrencyCode } from "@/types/common.js";


// Calculator
export enum Mode {
    TAX_ADDED_TO_TAX_FREE = "tax-added-to-tax-free",
    TAX_FREE_TO_TAX_ADDED = "tax-free-to-tax-added"
}

export type TaxFees = {
    total: number;
    customTax: number;
    specialConsumptionTax: number;
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
    currency: CurrencyCode;
};

export type Brand = {
    id: string;
    title: string;
};

export type Preset = {
    brandId: Brand["id"];
    title: string;
    slug: Lowercase<string>;
    releaseDate: Date;
    thumb: `${Lowercase<string>}.png`;
    pageTitle: string;
    pageDescription: string;
    options: PresetOption[];
};

export type PresetOption = {
    title: string;
    form: Partial<Form>;
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
