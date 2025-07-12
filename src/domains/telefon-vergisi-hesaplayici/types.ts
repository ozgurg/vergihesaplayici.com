import type { CurrencyCode } from "@/types/common.js";


// Calculator
export enum Registration {
    IMPORT = "import",
    PASSPORT = "passport"
}

export type TaxFees = {
    total: number;
    ministryOfCulture: number;
    trtImport: number;
    specialConsumptionTax: number;
    valueAddedTax: number;
    trtPassport: number;
    registration: number;
};

export type TaxRates = {
    total: number;
    ministryOfCulture: number;
    trtImport: number;
    specialConsumptionTax: number;
    valueAddedTax: number;
    trtPassport: number;
};

export type Prices = {
    taxFree: number;
    taxAdded: number;
};


// DB
export type Form = {
    price: number;
    currency: CurrencyCode;
    registration: Registration;
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
