import { buildHeadTags } from "@/utils/build-head-tags.js";
import TelefonVergisiHesaplayici from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.page.js";
import { findCalculatorPresetBySlug } from "@/utils/find-calculator-preset-by-slug.js";

import presets from "@/calculators/telefon-vergisi-hesaplayici/data/presets.js";
import { findPresetOptionsByPresetId, findBrandById } from "@/calculators/telefon-vergisi-hesaplayici/utils.js";
import presetOptions from "@/calculators/telefon-vergisi-hesaplayici/data/preset-options.js";

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
        ogImageName: preset.ogImageName ?? "telefon-vergisi-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...TelefonVergisiHesaplayici.breadcrumbs,
        { title: `${brand.title} ${preset.title}`, url }
    ];

    const options = findPresetOptionsByPresetId(preset.id, presetOptions);

    console.log(options);

    return {
        title,
        calculatorTitle: TelefonVergisiHesaplayici.title,
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
