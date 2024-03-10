import { buildHeadTags } from "@/utils/build-head-tags.js";
import { KonsolVergisiHesaplayiciPageDef } from "@/page-def/konsol-vergisi-hesaplayici.page-def.js";
import { findCalculatorPresetBySlug } from "@/utils/find-calculator-preset-by-slug.js";

import presets from "@/data/konsol-vergisi-hesaplayici/presets.js";
import { findBrandById, findPresetOptionsByPresetId } from "@/data/konsol-vergisi-hesaplayici/utils.js";
import presetOptions from "@/data/konsol-vergisi-hesaplayici/preset-options.js";

const konsolVergisiHesaplayiciPage = KonsolVergisiHesaplayiciPageDef();

export default slug => {
    const preset = findCalculatorPresetBySlug(slug, presets);
    if (!preset) {
        return false;
    }

    const brand = findBrandById(preset.brandId);

    const title = preset.pageTitle;
    const url = preset.url;
    const description = preset.pageDescription;
    const head = buildHeadTags({
        title,
        description,
        ogImageName: preset.ogImageName ?? "konsol-vergisi-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...konsolVergisiHesaplayiciPage.breadcrumbs,
        {
            title: `${brand.title} ${preset.title}`,
            url
        }
    ];

    const options = findPresetOptionsByPresetId(preset.id, presetOptions);

    return {
        title,
        calculatorTitle: konsolVergisiHesaplayiciPage.title,
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
