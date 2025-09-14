import type { Preset } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import type { Props as CalculatorPresetCarouselProps } from "@/components/calculator-preset-carousel.astro";
import { TelefonVergisiHesaplayiciPresetSlugPageDef } from "@/domains/telefon-vergisi-hesaplayici/page-def.js";
import { getBrandById, getThumbByFileName } from "@/domains/telefon-vergisi-hesaplayici/db.js";

export const mapPresetsForCalculatorPresetCarouselComponent = (presets: Preset[]): CalculatorPresetCarouselProps["items"] => {
    return presets.map(_preset => {
        const telefonVergisiHesaplayiciPresetSlugPage = TelefonVergisiHesaplayiciPresetSlugPageDef({ preset: _preset });
        const presetBrand = getBrandById(_preset.brandId);
        return {
            thumb: getThumbByFileName(_preset.thumb),
            title: _preset.title,
            brandTitle: presetBrand.title,
            releaseYear: _preset.releaseDate.getFullYear(),
            url: telefonVergisiHesaplayiciPresetSlugPage.url
        };
    });
};
