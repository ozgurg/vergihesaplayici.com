// oxlint-disable import/no-namespace

import type { Brand, Preset } from "@/domains/konsol-vergisi/types.js";
import type { PageSlug } from "@/types/page-def.js";
import * as Nintendo from "@/domains/konsol-vergisi/db/nintendo.js";
import * as Valve from "@/domains/konsol-vergisi/db/valve.js";
import * as Sony from "@/domains/konsol-vergisi/db/sony.js";
import * as Microsoft from "@/domains/konsol-vergisi/db/microsoft.js";
import * as Asus from "@/domains/konsol-vergisi/db/asus.js";

const withBrandId = (
    presets: Omit<Preset, "brandId">[],
    brandId: string
): Preset[] => {
    return presets.map(_preset => ({
        ..._preset,
        brandId
    }));
};

export const Brands: Brand[] = [
    Nintendo.brand,
    Valve.brand,
    Sony.brand,
    Microsoft.brand,
    Asus.brand
] as const;

export const Presets: Preset[] = [
    ...withBrandId(Nintendo.presets, Nintendo.brand.id),
    ...withBrandId(Valve.presets, Valve.brand.id),
    ...withBrandId(Sony.presets, Sony.brand.id),
    ...withBrandId(Microsoft.presets, Microsoft.brand.id),
    ...withBrandId(Asus.presets, Asus.brand.id)
] as const;

const getStatusPriority = (status?: string): number => {
    if (!status || status === "active") {
        return 0;
    }
    if (status === "placeholder") {
        return 1;
    }
    if (status === "legacy") {
        return 2;
    }
    return 3;
};

const sortPresets = (presets: Preset[]): Preset[] => {
    return presets.toSorted((_p1, _p2) => {
        const statusDiff = getStatusPriority(_p1.status) - getStatusPriority(_p2.status);
        if (statusDiff !== 0) {
            return statusDiff;
        }
        return _p2.releaseDate.getTime() - _p1.releaseDate.getTime();
    });
};

export const getPresetBySlug = (slug: PageSlug): Preset => {
    return Presets.find(_preset => _preset.slug === slug) as Preset;
};

export const getPresetsByBrandId = (brandId: string): Preset[] => {
    return Presets.filter(_preset => _preset.brandId === brandId);
};

export const getBrandById = (brandId: string): Brand => {
    return Brands.find(_brand => _brand.id === brandId) as Brand;
};

export const getPresetsForAllBrands = (): Preset[] => {
    return sortPresets(
        Brands.flatMap(_brand => {
            return getPresetsByBrandId(_brand.id);
        })
    );
};
