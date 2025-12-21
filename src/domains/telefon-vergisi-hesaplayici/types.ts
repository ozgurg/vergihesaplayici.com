import type { CurrencyCode } from "@/types/common.js";


// Calculator
export type Mode = "tax-added-to-tax-free" | "tax-free-to-tax-added";

export type Registration = "import" | "passport";

export type TaxFees = {
    total: number;
    ministryOfCulture: number;
    trtImport: number;
    specialConsumptionTax: number;
    valueAddedTax: number;
    trtPassport: number;
    registration: number;
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
    disclaimerNote?: string;
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

export type ChartItem = {
    value: number;
    label: string;
};

export type ChartData = {
    taxRates: ChartItem[],
    total: ChartItem[]
};

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
