import brands from "@/calculators/telefon-vergisi-hesaplayici/data/brands.js";
import presets from "@/calculators/telefon-vergisi-hesaplayici/data/presets.js";
import presetOptions from "@/calculators/telefon-vergisi-hesaplayici/data/preset-options.js";

const findPresetsByBrandId = (brandId, presets) => {
    return presets.filter(preset => preset.brandId === brandId);
};

const findPresetOptionsByPresetId = (presetId, presetOptions) => {
    return presetOptions.filter(presetOption => presetOption.presetId === presetId);
};

const buildCalculations = () => {
    return brands.map(brand => ({
        brand,
        presets: findPresetsByBrandId(brand.id, presets).map(preset => ({
            ...preset,
            options: findPresetOptionsByPresetId(preset.id, presetOptions)
        }))
    }));
};

export {
    findPresetsByBrandId,
    findPresetOptionsByPresetId,
    buildCalculations
};
