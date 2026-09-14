import type { Country } from "@/domains/iphone-ulke-fiyatlari/types.js";
import type { Preset } from "@/domains/telefon-vergisi/types.js";

export const getAppleStoreSlug = (presetSlug: Preset["slug"] | string): string => {
    if (presetSlug === "apple-iphone-16-plus") return "iphone-16";
    if (presetSlug === "apple-iphone-18-pro-max") return "iphone-18-pro";
    return presetSlug.replace(/^apple-/u, "");
};

export const getAppleStoreUrl = (countryPrefix: Country["prefix"], presetSlug: Preset["slug"]): URL => {
    const slug = getAppleStoreSlug(presetSlug);
    return new URL(`https://www.apple.com${countryPrefix}/shop/buy-iphone/${slug}`);
};
