import { KonsolVergisiHesaplayiciPageDef } from "@/domain/konsol-vergisi-hesaplayici/index.page-def.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";
import { findPresetOptionsByPresetId } from "@/domain/konsol-vergisi-hesaplayici/db/_index.js";

const parentPage = KonsolVergisiHesaplayiciPageDef();

/** @type {KonsolVergisiHesaplayiciPresetPageDefinition} */
const KonsolVergisiHesaplayiciSlugPageDef = ({
    preset,
    brand
}) => {
    const title = preset.pageTitle;
    const url = `${parentPage.url}${preset.slug}/`;
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

    const options = findPresetOptionsByPresetId(preset.id);

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
