/**
 * @param {string} slug
 * @param {object[]} presets
 * @returns {object}
 */
const findCalculatorPresetBySlug = (slug, presets) => presets.find(preset => preset.slug === slug);

export {
    findCalculatorPresetBySlug
};
