/**
 * @param {[{id: number, title: string, price: number, currency: string}]} presets
 * @param {number} price
 * @param {string} currency
 * @return {[{id: number, title: string, price: number, currency: string}]}
 */
const findCalculatorMatchingPresets = (presets, {
    price,
    currency
}) => {
    return presets.filter(preset => {
        const isPriceMatching = preset.price === price;
        const isCurrencyMatching = preset.currency === currency;
        const isPriceThresholdMatching = (preset.price + 1) === price;

        return (isPriceMatching || isPriceThresholdMatching) && isCurrencyMatching;
    });
};

/**
 * @param {[{id, title, price, currency}]} matchingPresets
 * @return {[number]}
 */
const createCalculatorMatchingPresetIds = matchingPresets => {
    return matchingPresets.reduce((previous, preset) => ([...previous, preset.id]), []);
};

export {
    findCalculatorMatchingPresets,
    createCalculatorMatchingPresetIds
};
