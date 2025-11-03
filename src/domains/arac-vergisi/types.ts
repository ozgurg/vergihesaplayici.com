import type { CurrencyCode } from "@/types/common.js";


// Calculator
export enum Mode {
    TAX_ADDED_TO_TAX_FREE = "tax-added-to-tax-free",
    TAX_FREE_TO_TAX_ADDED = "tax-free-to-tax-added"
}

export enum VehicleType {
    AUTOMOBILE = "automobile",
    ELECTRIC_AUTOMOBILE = "electric-automobile",
    HYBRID_AUTOMOBILE = "hybrid-automobile",
    MOTORCYCLE = "motorcycle",
    BUS = "bus",
    MIDIBUS = "midibus",
    MINIBUS = "minibus",
    HELICOPTER = "helicopter",
    PLANE = "plane",
    BOAT = "boat",
    YACHT = "yacht",
}

export enum VehicleEngineVolume {
    AUTOMOBILE__0_1400 = "automobile.0-1400",
    AUTOMOBILE__1401_1600 = "automobile.1401-1600",
    AUTOMOBILE__1601_2000 = "automobile.1601-2000",
    AUTOMOBILE__2001_UP = "automobile.2001-up",

    ELECTRIC_AUTOMOBILE__0_160 = "electric-automobile.0-160",
    ELECTRIC_AUTOMOBILE__161_UP = "electric-automobile.161-up",

    HYBRID_AUTOMOBILE__50_UP_0_1800 = "hybrid-automobile.50-up.0-1800",
    HYBRID_AUTOMOBILE__100_UP_0_2500 = "hybrid-automobile.100-up.0-2500",
    HYBRID_AUTOMOBILE__OTHER = "hybrid-automobile.other",

    MOTORCYCLE__0_250 = "motorcycle.0-250",
    MOTORCYCLE__251_UP = "motorcycle.251-up"
}

export type TaxFees = {
    total: number;
    trt: number;
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
    vehicleType: VehicleType;
    vehicleEngineVolume: VehicleEngineVolume | null;
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
    isMuted?: boolean;
};

export type ResultList = ResultListItem[];
