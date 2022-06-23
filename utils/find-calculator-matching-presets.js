import { findMatchingPresets } from "@/utils/find-matching-presets";

const findCalculatorMatchingPresets = (presets, {
    price,
    currency
}) => {
    return findMatchingPresets(presets, preset => {
        const isPriceMatching = preset.price === price;
        const isCurrencyMatching = preset.currency === currency;
        const isPriceThresholdMatching = (preset.price + 1) === price;

        return (isPriceMatching || isPriceThresholdMatching) && isCurrencyMatching;
    });
};

export {
    findCalculatorMatchingPresets
};
