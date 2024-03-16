import brands from "@/domain/telefon-vergisi-hesaplayici/db/brands.js";
import presets from "@/domain/telefon-vergisi-hesaplayici/db/presets.js";
import presetOptions from "@/domain/telefon-vergisi-hesaplayici/db/preset-options.js";
import { TelefonVergisiHesaplayiciSlugPageDef } from "@/domain/telefon-vergisi-hesaplayici/slug.page-def.js";

/**
 * @param {number} brandId
 * @return {TelefonVergisiHesaplayiciBrand|undefined}
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
 * @return {TelefonVergisiHesaplayiciCalculation[]}
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
 * @return {TelefonVergisiHesaplayiciPreset[]}
 */
const _findPresetsByBrandId = brandId => {
    return presets.filter(preset => preset.brandId === brandId);
};

/**
 * @param {TelefonVergisiHesaplayiciPreset} preset
 * @param {TelefonVergisiHesaplayiciBrand} brand
 * @return {TelefonVergisiHesaplayiciPresetWithPage}
 */
const _mergePresetWithPage = (preset, brand) => {
    return {
        ...preset,
        page: TelefonVergisiHesaplayiciSlugPageDef({
            preset,
            brand
        })
    };
};

export {
    presets,
    findBrandById,
    findPresetOptionsByPresetId,
    buildCalculations
};
