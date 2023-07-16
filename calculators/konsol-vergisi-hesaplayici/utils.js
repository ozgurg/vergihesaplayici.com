import brands from "@/calculators/konsol-vergisi-hesaplayici/data/brands.js";
import presets from "@/calculators/konsol-vergisi-hesaplayici/data/presets.js";
import presetOptions from "@/calculators/konsol-vergisi-hesaplayici/data/preset-options.js";

const findBrandById = brandId => {
    return brands.find(brand => brand.id === brandId);
};

const findPresetsByBrandId = brandId => {
    return presets.filter(preset => preset.brandId === brandId);
};

const findPresetOptionsByPresetId = presetId => {
    return presetOptions.filter(presetOption => presetOption.presetId === presetId);
};

const buildCalculations = () => {
    return brands.map(brand => ({
        brand,
        presets: findPresetsByBrandId(brand.id).map(preset => ({
            ...preset,
            options: findPresetOptionsByPresetId(preset.id)
        }))
    }));
};

export {
    findBrandById,
    findPresetsByBrandId,
    findPresetOptionsByPresetId,
    buildCalculations
};
