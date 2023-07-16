import { buildHeadTags } from "@/utils/build-head-tags.js";
import KonsolVergisiHesaplayici from "@/data/pages/konsol-vergisi-hesaplayici/konsol-vergisi-hesaplayici.page.js";
import { findCalculatorPresetBySlug } from "@/utils/find-calculator-preset-by-slug.js";

import presets from "@/calculators/konsol-vergisi-hesaplayici/data/presets.js";
import { findPresetOptionsByPresetId } from "@/calculators/konsol-vergisi-hesaplayici/utils.js";
import presetOptions from "@/calculators/konsol-vergisi-hesaplayici/data/preset-options.js";

export default slug => {
    const preset = findCalculatorPresetBySlug(slug, presets);
    if (!preset) {
        return false;
    }

    const title = preset.pageTitle;
    const url = preset.url;
    const description = preset.pageDescription;
    const head = buildHeadTags({
        title,
        description,
        ogImageName: preset.ogImageName ?? "konsol-vergisi-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...KonsolVergisiHesaplayici.breadcrumbs,
        { title: preset.title, url }
    ];

    const options = findPresetOptionsByPresetId(preset.id, presetOptions);

    return {
        title,
        calculatorTitle: KonsolVergisiHesaplayici.title,
        url,
        description,
        head,
        breadcrumbs,
        preset: {
            ...preset,
            options
        }
    };
};

export {
    presets
};
