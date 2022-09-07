import { normalizePrice } from "@/utils/formatter.js";

/**
 * @param {Object<string, Object<string, number | null>>} results
 * @returns {Object<string, Object<string, number | null>>}
 */
const normalizeCalculatorResults = results => {
    for (const [key1, value1] of Object.entries(results)) {
        for (const [key2, value2] of Object.entries(value1)) {
            if (value2 === null) continue;

            results[key1][key2] = normalizePrice(value2);
        }
    }

    return results;
};

export {
    normalizeCalculatorResults
};
