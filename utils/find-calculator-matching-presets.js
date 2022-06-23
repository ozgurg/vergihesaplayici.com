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

const createCalculatorMatchingPresetIds = matchingPresets => {
    return matchingPresets.reduce((previous, preset) => [...previous, preset.id], []);
};

export {
    findCalculatorMatchingPresets,
    createCalculatorMatchingPresetIds
};
