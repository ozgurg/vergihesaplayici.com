/**
 * @param {string} slug
 * @param {object[]} presets
 * @returns {object}
 */
export const findCalculatorPresetBySlug = (slug, presets) => presets.find(preset => preset.slug === slug);
