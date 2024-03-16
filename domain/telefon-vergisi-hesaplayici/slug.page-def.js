import { TelefonVergisiHesaplayiciPageDef } from "@/domain/telefon-vergisi-hesaplayici/index.page-def.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";
import { findPresetOptionsByPresetId, presetOptions } from "@/domain/telefon-vergisi-hesaplayici/db/_index.js";

const parentPage = TelefonVergisiHesaplayiciPageDef();

/** @type {TelefonVergisiHesaplayiciPresetPageDefinition} */
const TelefonVergisiHesaplayiciSlugPageDef = ({
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
        ogImage: preset.ogImage ?? "telefon-vergisi-hesaplayici/og/telefon-vergisi-hesaplayici.jpg"
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
    TelefonVergisiHesaplayiciSlugPageDef
};
