import { normalizePrice } from "@/utils/formatter.js";

/**
 * @param {{[key: string]: {[key: string]: number|null}}} results
 * @returns {{[key: string]: {[key: string]: number|null}}}
 */
export const normalizeCalculatorResults = results => {
    for (const [key1, value1] of Object.entries(results)) {
        for (const [key2, value2] of Object.entries(value1)) {
            if (value2 === null) continue;

            results[key1][key2] = normalizePrice(value2);
        }
    }

    return results;
};
