import type { Preset } from "@/domains/telefon-vergisi/types.js";
import type { Props as CalculatorPresetCarouselProps } from "@/components/calculator-preset-carousel.astro";
import { TelefonVergisiPresetSlugPageDef } from "@/domains/telefon-vergisi/page-def.js";
import { getBrandById } from "@/domains/telefon-vergisi/db.js";

export const mapPresetsForCalculatorPresetCarouselComponent = (presets: Preset[]): CalculatorPresetCarouselProps["items"] => {
    return presets.map(_preset => {
        const presetBrand = getBrandById(_preset.brandId);
        const telefonVergisiPresetSlugPage = TelefonVergisiPresetSlugPageDef({
            preset: _preset,
            brand: presetBrand
        });
        return {
            thumb: getThumbByFileName(_preset.thumb),
            title: _preset.title,
            brandTitle: presetBrand.title,
            releaseYear: _preset.releaseDate.getFullYear(),
            url: telefonVergisiPresetSlugPage.url
        };
    });
};
