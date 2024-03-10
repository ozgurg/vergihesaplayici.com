/** @deprecated */

import { buildHeadTags } from "@/utils/build-head-tags.js";
import { TelefonVergisiHesaplayiciPageDef } from "@/domain/telefon-vergisi-hesaplayici/index.page-def.js";
import { findCalculatorPresetBySlug } from "@/utils/find-calculator-preset-by-slug.js";
import {
    findBrandById,
    findPresetOptionsByPresetId,
    presetOptions,
    presets
} from "@/domain/telefon-vergisi-hesaplayici/db/_index.js";

const parentPage = TelefonVergisiHesaplayiciPageDef();

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
        ogImage: preset.ogImage ?? "telefon-vergisi-hesaplayici/og/telefon-vergisi-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        {
            title: `${brand.title} ${preset.title}`,
            url
        }
    ];

    const options = findPresetOptionsByPresetId(preset.id, presetOptions);

    return {
        title,
        calculatorTitle: parentPage.title,
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
