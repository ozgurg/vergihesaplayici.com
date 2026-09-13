import type { Preset } from "@/domains/telefon-vergisi/types.js";
import type {
    ComparisonResult,
    CountryComparisonItem,
    PricesDataset
} from "@/domains/iphone-ulke-fiyatlari/types.js";
import { presets as applePresets } from "@/domains/telefon-vergisi/db/apple.js";
import pricesData from "@root/.generated/iphone-country-prices.json" with { type: "json" };
import { COUNTRIES } from "@/domains/iphone-ulke-fiyatlari/countries.js";
import { getAppleStoreUrl } from "@/domains/iphone-ulke-fiyatlari/utils/apple-store.js";

const dataset = pricesData as PricesDataset;

export const getActiveIphonePresets = (): Omit<Preset, "brandId">[] => {
    return applePresets.filter(preset => preset.status === "active");
};

export const getDefaultModelSlug = (): Preset["slug"] => {
    // oxlint-disable-next-line typescript/no-non-null-assertion
    return getActiveIphonePresets().at(-1)!.slug;
};

export const getComparisonBySlug = (modelSlug: Preset["slug"]): ComparisonResult | null => {
    const activePresets = getActiveIphonePresets();

    const preset = activePresets.find(_preset => _preset.slug === modelSlug) || activePresets[0];
    if (!preset) {
        return null;
    }

    const priceMap = dataset.prices?.[preset.slug] || {};

    const items: CountryComparisonItem[] = Object.entries(priceMap)
        .map(([code, priceUSD]) => {
            const country = COUNTRIES[code];
            if (!country) {
                return null;
            }
            return {
                country,
                priceUSD,
                barPercentage: 0,
                storeUrl: getAppleStoreUrl(country.prefix, preset.slug)
            };
        })
        .filter((_item): _item is CountryComparisonItem => _item !== null);

    items.sort((a, b) => b.priceUSD - a.priceUSD);

    const maxPriceUSD = items[0]?.priceUSD || 1;
    for (const _item of items) {
        _item.barPercentage = maxPriceUSD > 0 ? Math.max(8, Math.round((_item.priceUSD / maxPriceUSD) * 100)) : 100;
    }

    return {
        preset,
        items,
        maxPriceUSD
    };
};
