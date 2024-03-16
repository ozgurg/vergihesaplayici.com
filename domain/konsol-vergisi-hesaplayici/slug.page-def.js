import { KonsolVergisiHesaplayiciPageDef } from "@/domain/konsol-vergisi-hesaplayici/index.page-def.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";

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

    return {
        title,
        url,
        breadcrumbs,
        head,
        calculatorTitle: parentPage.title // FIXME
    };
};

export {
    KonsolVergisiHesaplayiciSlugPageDef
};
