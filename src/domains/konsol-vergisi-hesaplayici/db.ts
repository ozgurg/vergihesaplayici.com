/* oxlint-disable no-namespace */

import type { Brand, Preset } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import type { Thumb } from "@/utils/thumb-loader.js";
import { loadThumbs } from "@/utils/thumb-loader.js";
import * as Nintendo from "@/domains/konsol-vergisi-hesaplayici/db/nintendo.js";
import * as Valve from "@/domains/konsol-vergisi-hesaplayici/db/valve.js";
import * as Sony from "@/domains/konsol-vergisi-hesaplayici/db/sony.js";
import * as Microsoft from "@/domains/konsol-vergisi-hesaplayici/db/microsoft.js";
import * as Asus from "@/domains/konsol-vergisi-hesaplayici/db/asus.js";

export const Brands: Brand[] = [
    Nintendo.brand,
    Valve.brand,
    Sony.brand,
    Microsoft.brand,
    Asus.brand
] as const;

export const Presets: Preset[] = [
    ...Nintendo.presets,
    ...Valve.presets,
    ...Sony.presets,
    ...Microsoft.presets,
    ...Asus.presets
] as const;

export const Thumbs: Thumb[] = await loadThumbs("konsol-vergisi-hesaplayici");

const sortPresetsByReleaseDate = (presets: Preset[]): Preset[] => {
    return presets.toSorted((_p1, _p2) => _p2.releaseDate.getTime() - _p1.releaseDate.getTime());
};

export const getPresetBySlug = (slug: string): Preset => {
    return Presets.find(_preset => _preset.slug === slug) as Preset;
};

export const getPresetsByBrandId = (brandId: string): Preset[] => {
    return Presets.filter(_preset => _preset.brandId === brandId);
};

export const getBrandById = (brandId: string): Brand => {
    return Brands.find(_brand => _brand.id === brandId) as Brand;
};

export const getThumbByFileName = (fileName: string): Thumb => {
    return Thumbs.find(_thumb => _thumb.fileName === fileName) as Thumb;
};

export const getPresetsForAllBrands = (): Preset[] => {
    return sortPresetsByReleaseDate(
        Brands.flatMap(_brand => {
            return getPresetsByBrandId(_brand.id);
        })
    );
};
