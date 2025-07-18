import type { Preset } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import { KonsolVergisiHesaplayiciPresetSlugPageDef } from "@/domains/konsol-vergisi-hesaplayici/page-def.js";
import { getBrandById, getThumbByFileName } from "@/domains/konsol-vergisi-hesaplayici/db.js";

export const mapPresetsForCalculatorPresetCarouselComponent = (presets: Preset[]) => {
    return presets.map(_preset => {
        const konsolVergisiHesaplayiciPresetSlugPage = KonsolVergisiHesaplayiciPresetSlugPageDef({ preset: _preset });
        const presetBrand = getBrandById(_preset.brandId);
        return {
            thumb: getThumbByFileName(_preset.thumb),
            title: _preset.title,
            brandTitle: presetBrand.title,
            releaseYear: _preset.releaseDate.getFullYear(),
            url: konsolVergisiHesaplayiciPresetSlugPage.url
        };
    });
};
