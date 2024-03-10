import { buildHeadTags } from "@/utils/build-head-tags.js";
import { TelefonVergisiHesaplayiciPageDef } from "@/page-def/telefon-vergisi-hesaplayici.page-def.js";
import { findCalculatorPresetBySlug } from "@/utils/find-calculator-preset-by-slug.js";

import presets from "@/data/telefon-vergisi-hesaplayici/presets.js";
import { findBrandById, findPresetOptionsByPresetId } from "@/data/telefon-vergisi-hesaplayici/utils.js";
import presetOptions from "@/data/telefon-vergisi-hesaplayici/preset-options.js";

const telefonVergisiHesaplayiciPage = TelefonVergisiHesaplayiciPageDef();

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
        ...telefonVergisiHesaplayiciPage.breadcrumbs,
        {
            title: `${brand.title} ${preset.title}`,
            url
        }
    ];

    const options = findPresetOptionsByPresetId(preset.id, presetOptions);

    return {
        title,
        calculatorTitle: telefonVergisiHesaplayiciPage.title,
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
