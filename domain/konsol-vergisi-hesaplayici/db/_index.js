import brands from "@/domain/konsol-vergisi-hesaplayici/db/brands.js";
import presets from "@/domain/konsol-vergisi-hesaplayici/db/presets.js";
import presetOptions from "@/domain/konsol-vergisi-hesaplayici/db/preset-options.js";
import { KonsolVergisiHesaplayiciSlugPageDef } from "@/domain/konsol-vergisi-hesaplayici/slug.page-def.js";

/**
 * @param {number} brandId
 * @return {KonsolVergisiHesaplayiciBrand|undefined}
 */
const findBrandById = brandId => {
    return brands.find(brand => brand.id === brandId);
};

/**
 * @param {number} presetId
 * @return {object[]}
 */
const findPresetOptionsByPresetId = presetId => {
    return presetOptions.filter(presetOption => presetOption.presetId === presetId);
};

/**
 * @return {KonsolVergisiHesaplayiciCalculation[]}
 */
const buildCalculations = () => {
    return brands.map(_brand => ({
        brand: _brand,
        presets: _findPresetsByBrandId(_brand.id)
            .map(_preset => _mergePresetWithPage(_preset, _brand))
    }));
};

/**
 * @param {number} brandId
 * @return {KonsolVergisiHesaplayiciPreset[]}
 */
const _findPresetsByBrandId = brandId => {
    return presets.filter(preset => preset.brandId === brandId);
};

/**
 * @param {KonsolVergisiHesaplayiciPreset} preset
 * @param {KonsolVergisiHesaplayiciBrand} brand
 * @return {KonsolVergisiHesaplayiciPresetWithPage}
 */
const _mergePresetWithPage = (preset, brand) => {
    return {
        ...preset,
        page: KonsolVergisiHesaplayiciSlugPageDef({
            preset,
            brand
        })
    };
};

export {
    presets,
    presetOptions,
    findBrandById,
    findPresetOptionsByPresetId,
    buildCalculations
};
