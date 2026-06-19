import type { Preset } from "@/domains/konsol-vergisi/types.js";
import type { Props as CalculatorPresetCarouselProps } from "@/components/calculator-preset-carousel.astro";
import { KonsolVergisiPresetSlugPageDef } from "@/domains/konsol-vergisi/page-def.js";
import { getBrandById } from "@/domains/konsol-vergisi/db.js";

export const mapPresetsForCalculatorPresetCarouselComponent = (presets: Preset[]): CalculatorPresetCarouselProps["items"] => {
    return presets.map(_preset => {
        const presetBrand = getBrandById(_preset.brandId);
        const konsolVergisiPresetSlugPage = KonsolVergisiPresetSlugPageDef({
            preset: _preset,
            brand: presetBrand
        });
        return {
            thumb: getThumbByFileName(_preset.thumb),
            title: _preset.title,
            brandTitle: presetBrand.title,
            releaseYear: _preset.releaseDate.getFullYear(),
            url: konsolVergisiPresetSlugPage.url
        };
    });
};
