import { KonsolVergisiHesaplayiciPageDef } from "@/domain/konsol-vergisi-hesaplayici/index.page-def.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";
import { findCalculatorPresetBySlug } from "@/utils/find-calculator-preset-by-slug.js";
import {
    findBrandById,
    findPresetOptionsByPresetId,
    presetOptions,
    presets
} from "@/domain/konsol-vergisi-hesaplayici/db/_index.js";

const parentPage = KonsolVergisiHesaplayiciPageDef();

/** @type {KonsolVergisiHesaplayiciPresetPageDefinition} */
const KonsolVergisiHesaplayiciSlugPageDef = slug => {
    const preset = findCalculatorPresetBySlug(slug, presets);
    if (!preset) {
        return false;
    }

    const brand = findBrandById(preset.brandId);

    const title = preset.pageTitle;
    const url = preset.url;
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        {
            title: `${brand.title} ${preset.title}`,
            url
        }
    ];
    const head = buildHeadTags({
        title,
        description: preset.pageDescription,
        ogImage: preset.ogImage ?? "konsol-vergisi-hesaplayici/og/konsol-vergisi-hesaplayici.jpg"
    });

    const options = findPresetOptionsByPresetId(preset.id, presetOptions);

    return {
        title,
        url,
        breadcrumbs,
        head,
        calculatorTitle: parentPage.title,
        preset: {
            ...preset,
            options
        }
    };
};

export {
    KonsolVergisiHesaplayiciSlugPageDef
};
