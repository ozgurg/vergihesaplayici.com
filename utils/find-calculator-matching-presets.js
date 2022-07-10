/**
 * @param {[{id: number, title: string, form: {price: number, currency: string}}]} presets
 * @param {number} price
 * @param {string} currency
 * @return {[{id: number, title: string, price: number, currency: string}]}
 */
const findCalculatorMatchingPresets = (presets, {
    price,
    currency
}) => {
    return presets.filter(preset => {
        const isPriceMatching = preset.form.price === price;
        const isCurrencyMatching = preset.form.currency === currency;
        const isPriceThresholdMatching = (preset.form.price + 1) === price;

        return (isPriceMatching || isPriceThresholdMatching) && isCurrencyMatching;
    });
};

/**
 * @param {[{id: number, title: string, form: {price, currency}}]} matchingPresets
 * @return {[number]}
 */
const createCalculatorMatchingPresetIds = matchingPresets => {
    return matchingPresets.reduce((previous, preset) => ([...previous, preset.id]), []);
};

/**
 * @param {[{id: number, title: string, form: {price, currency}}]} matchingPresets
 * @return {[string]}
 */
const createCalculatorMatchingPresetTitles = matchingPresets => {
    return matchingPresets.reduce((previous, preset) => ([...previous, preset.title]), []);
};

export {
    findCalculatorMatchingPresets,
    createCalculatorMatchingPresetIds,
    createCalculatorMatchingPresetTitles
};
