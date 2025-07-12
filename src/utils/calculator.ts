import { normalizePrice } from "@/utils/formatter.js";

type CalculatorPrimitive = string | number | boolean | null | undefined;
type CalculatorValue = CalculatorPrimitive | CalculatorValue[] | { [key: string]: CalculatorValue };

type CalculatorResults = { [key: string]: CalculatorValue };

const normalizeValue = <T extends CalculatorValue>(value: T): T => {
    if (typeof value === "number") {
        return normalizePrice(value) as T;
    }

    if (Array.isArray(value)) {
        return value.map(v => normalizeValue(v)) as T;
    }

    if (value !== null && typeof value === "object") {
        const normalized: CalculatorResults = {};
        for (const [key, value2] of Object.entries(value)) {
            normalized[key] = normalizeValue(value2);
        }
        return normalized as T;
    }

    return value;
};

export const normalizeCalculatorResults = <T extends CalculatorResults>(results: T): T => {
    return normalizeValue(results) as T;
};

export const calculateTaxFromTaxFreePrice = (taxFreePrice: number, taxRate: number): number => {
    return normalizePrice((taxFreePrice / 100) * taxRate);
};

export const calculateTaxFromTaxAddedPrice = (taxAddedPrice: number, taxRate: number): number => {
    return normalizePrice(taxAddedPrice / (1 + (100 / taxRate)));
};

export const calculateTotalTaxRate = (taxFee: number, price: number): number => {
    return (taxFee / price) * 100;
};
