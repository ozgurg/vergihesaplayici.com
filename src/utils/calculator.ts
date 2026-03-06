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

const normalizeCalculatorResults = <T extends CalculatorResults>(results: T): T => {
    return normalizeValue(results) as T;
};

const calculateTaxFromTaxFreePrice = (taxFreePrice: number, taxRate: number): number => {
    return normalizePrice((taxFreePrice / 100) * taxRate);
};

const calculateTaxFromTaxAddedPrice = (taxAddedPrice: number, taxRate: number): number => {
    return normalizePrice(taxAddedPrice / (1 + (100 / taxRate)));
};

const calculateTotalTaxRate = (taxFee: number, price: number): number => {
    return (taxFee / price) * 100;
};

// We define these as `const` separate from the `export` statement and export them all at the end
// to workaround a parsing bug in `unimport` (used by `unplugin-auto-import`).
// When using `export const sum = (a: number, b: number) => {}`, `unimport` can sometimes
// incorrectly parse parameter names (e.g. `b`) as exported variables.
export {
    normalizeCalculatorResults,
    calculateTaxFromTaxFreePrice,
    calculateTaxFromTaxAddedPrice,
    calculateTotalTaxRate
};
