/**
 * @param {{id: number, title: string, form: {price: number, currency: string}}[]} presets
 * @param {object} options
 * @param {number} options.price
 * @param {string} options.currency
 * @returns {{id: number, title: string, price: number, currency: string}[]}
 */
const findCalculatorMatchingPresets = (presets, {
    price,
    currency
}) => {
    return presets.filter(preset => {
        const isPriceMatching = preset.form.price === price;
        const isCurrencyMatching = preset.form.currency === currency;

        // We want it to match even if `price` is 350 and `preset.form.price` is 349.99
        // But not 350.99. So that's why we used `parseInt` before adding `1`
        const isPriceThresholdMatching = price > preset.form.price && price <= parseInt(preset.form.price) + 1;

        return (isPriceMatching || isPriceThresholdMatching) && isCurrencyMatching;
    });
};

/**
 * @param {{id: number, title: string, form: {price, currency}}[]} matchingPresets
 * @returns {number[]}
 */
const createCalculatorMatchingPresetIds = matchingPresets => {
    return matchingPresets.reduce((previous, preset) => ([...previous, preset.id]), []);
};

/**
 * @param {{id: number, title: string, form: {price, currency}}[]} matchingPresets
 * @returns {string[]}
 */
const createCalculatorMatchingPresetTitles = matchingPresets => {
    return matchingPresets.reduce((previous, preset) => ([...previous, preset.title]), []);
};

export {
    findCalculatorMatchingPresets,
    createCalculatorMatchingPresetIds,
    createCalculatorMatchingPresetTitles
};
