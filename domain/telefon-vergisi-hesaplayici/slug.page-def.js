import { TelefonVergisiHesaplayiciPageDef } from "@/domain/telefon-vergisi-hesaplayici/index.page-def.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";

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

    return {
        title,
        url,
        breadcrumbs,
        head,
        calculatorTitle: parentPage.title // FIXME
    };
};

export {
    TelefonVergisiHesaplayiciSlugPageDef
};
