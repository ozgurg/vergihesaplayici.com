const findMatchingPresets = (presets, matcher) => {
    return presets.filter(preset => matcher(preset));
};

export {
    findMatchingPresets
};
