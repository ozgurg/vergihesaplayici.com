import brands from "@/domain/konsol-vergisi-hesaplayici/brands.js";
import presets from "@/domain/konsol-vergisi-hesaplayici/presets.js";
import presetOptions from "@/domain/konsol-vergisi-hesaplayici/preset-options.js";

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
