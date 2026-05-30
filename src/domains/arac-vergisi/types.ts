import type { CurrencyCode } from "@/types/common.js";
import type { TaxCalculationStep } from "@/utils/tax-calculator.js";


// Calculator
export type Mode = "tax-added-to-tax-free" | "tax-free-to-tax-added";

export type VehicleType =
    | "automobile"
    | "electric-automobile"
    | "hybrid-automobile"
    | "motorcycle"
    | "bus"
    | "midibus"
    | "minibus"
    | "helicopter"
    | "plane"
    | "boat"
    | "yacht";

export type VehicleEngineVolume =
    | `automobile.${"0-1400" | "1401-1600" | "1601-2000" | "2001-up"}`
    | `electric-automobile.${"0-160" | "161-up"}`
    | `hybrid-automobile.${"50-up.0-1800" | "100-up.0-2500" | "other"}`
    | `motorcycle.${"0-250" | "251-up"}`;

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

export type TaxStepId = Exclude<keyof TaxFees, "total">;

export type CalculationResults = {
    taxFees: TaxFees;
    taxRates: TaxRates;
    prices: Prices;
    steps: { [key in TaxStepId]: TaxCalculationStep<TaxStepId> };
};

export type ResultListItem = {
    key: string;
    label: string;
    value: string;
    isMuted?: boolean;
    details?: { label: string; value: string }[];
};

export type ResultList = ResultListItem[];
