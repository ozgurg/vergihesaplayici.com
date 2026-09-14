import fs from "node:fs";
import path from "node:path";
import type { Country, PricesDataset } from "@/domains/iphone-ulke-fiyatlari/types.js";
import type { Preset } from "@/domains/telefon-vergisi/types.js";
import { presets as applePresets } from "@/domains/telefon-vergisi/db/apple.js";
import { COUNTRIES } from "@/domains/iphone-ulke-fiyatlari/countries.js";
import { getAppleStoreSlug } from "@/domains/iphone-ulke-fiyatlari/utils/apple-store.js";

const getActiveIphonePresets = (): Omit<Preset, "brandId">[] => {
    return applePresets.filter(_preset => _preset.status === "active");
};

const GENERATED_FOLDER_NAME = ".generated";
const GENERATED_JSON_NAME = "iphone-country-prices.json";
const GENERATED_JSON_PATH = path.resolve(process.cwd(), path.join(GENERATED_FOLDER_NAME, GENERATED_JSON_NAME));

const getExchangeRates = async (): Promise<{ [currency: string]: number }> => {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = (await response.json()) as { rates: { [currency: string]: number } };
    return data.rates;
};

type ScrapedProductOffer = {
    name?: string;
    country: Country;
    currency: string;
    lowPrice: number;
};

const tryExtractProductOffer = (
    scriptContent: string | undefined,
    country: Country
): ScrapedProductOffer | null => {
    if (!scriptContent) {
        return null;
    }
    try {
        const data = JSON.parse(scriptContent);
        if (data?.["@type"] === "Product" && data?.offers) {
            const offer = Array.isArray(data.offers) ? data.offers[0] : data.offers;
            return {
                name: typeof data.name === "string" ? data.name : undefined,
                country,
                currency: offer.priceCurrency,
                lowPrice: Number.parseFloat(offer.lowPrice)
            };
        }
    } catch {
        // Ignore
    }
    return null;
};

const scrapeAppleCountry = async (
    slug: string,
    country: Country
): Promise<ScrapedProductOffer[]> => {
    const url = `https://www.apple.com${country.prefix}/shop/buy-iphone/${slug}`;
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9"
            }
        });

        const html = await response.text();

        const offers: ScrapedProductOffer[] = [];
        const scriptMatches = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu);
        for (const _match of scriptMatches) {
            const productOffer = tryExtractProductOffer(_match[1], country);
            if (productOffer) {
                offers.push(productOffer);
            }
        }

        if (offers.length > 0) {
            return offers;
        }

        // Special handling for China / Baidu JSON-LD format
        if (country.code === "cn") {
            const currentPriceMatches = [...html.matchAll(/class="[^"]*current_price[^"]*"[^>]*>(?:RMB|¥)\s*([0-9,]+)/giu)];
            const prices = currentPriceMatches
                .map(_match => Number.parseInt(_match[1]?.replaceAll(",", "") || "0", 10))
                .filter(_price => _price > 2_000);

            const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
            if (minPrice > 2_000) {
                return [
                    {
                        name: undefined,
                        country,
                        currency: "CNY",
                        lowPrice: minPrice
                    }
                ];
            }
        }
    } catch {
        // Ignore
    }
    return [];
};

const normalizeModelName = (name: string): string => {
    return name.toLowerCase().replace(/^apple\s+/iu, "").replaceAll(/[^a-z0-9]/giu, "");
};

const findMatchingOffer = (
    offers: ScrapedProductOffer[],
    preset: Omit<Preset, "brandId">
): ScrapedProductOffer | null => {
    if (offers.length === 0) {
        return null;
    }

    const targetNorm = normalizeModelName(preset.title);

    const exact = offers.find(_offer => _offer.name && normalizeModelName(_offer.name) === targetNorm);
    if (exact) {
        return exact;
    }

    const partial = offers.find(_offer => _offer.name && (
        normalizeModelName(_offer.name).includes(targetNorm) || targetNorm.includes(normalizeModelName(_offer.name))
    ));
    if (partial) {
        return partial;
    }

    return offers[0] || null;
};

export const fetchAndGenerateApplePrices = async (): Promise<void> => {
    const generatedFolderPath = path.resolve(process.cwd(), GENERATED_FOLDER_NAME);
    if (!fs.existsSync(generatedFolderPath)) {
        fs.mkdirSync(generatedFolderPath, { recursive: true });
    }

    if (fs.existsSync(GENERATED_JSON_PATH)) {
        try {
            const stat = fs.statSync(GENERATED_JSON_PATH);
            const ONE_HOUR = 3_600_000;
            if (Date.now() - stat.mtimeMs < ONE_HOUR) {
                return;
            }
        } catch {
            // Ignore
        }
    }

    const activePresets = getActiveIphonePresets();

    const rates = await getExchangeRates();

    const dataset: PricesDataset = {
        updatedAt: new Date().toISOString(),
        prices: {}
    };

    const uniqueStoreSlugs = [...new Set(activePresets.map(_preset => getAppleStoreSlug(_preset.slug)))];

    const storeSlugOffersMap: {
        [slug: string]: {
            [countryCode: string]: ScrapedProductOffer[];
        };
    } = {};

    await Promise.all(
        uniqueStoreSlugs.map(async (_slug) => {
            const countryOffers: { [countryCode: string]: ScrapedProductOffer[] } = {};
            await Promise.all(
                Object.values(COUNTRIES).map(async (_country) => {
                    const offers = await scrapeAppleCountry(_slug, _country);
                    if (offers.length > 0) {
                        countryOffers[_country.code] = offers;
                    }
                })
            );
            storeSlugOffersMap[_slug] = countryOffers;
        })
    );

    const modelEntries = activePresets.map(_preset => {
        const appleStoreSlug = getAppleStoreSlug(_preset.slug);
        const countryOffersMap = storeSlugOffersMap[appleStoreSlug] || {};

        const countryPrices: {
            [countryCode: string]: { priceUSD: number; priceLocal: number; currencyLocal: string };
        } = {};

        for (const [countryCode, offers] of Object.entries(countryOffersMap)) {
            const matchedOffer = findMatchingOffer(offers, _preset);
            if (matchedOffer) {
                const rateToUsd = rates[matchedOffer.currency] || 1;
                const priceUSD = matchedOffer.currency === "USD"
                    ? matchedOffer.lowPrice
                    : Math.round(matchedOffer.lowPrice / rateToUsd);

                countryPrices[countryCode] = {
                    priceUSD,
                    priceLocal: matchedOffer.lowPrice,
                    currencyLocal: matchedOffer.currency
                };
            }
        }

        return {
            slug: _preset.slug,
            prices: countryPrices
        };
    });

    for (const _entry of modelEntries) {
        dataset.prices[_entry.slug] = _entry.prices;
    }

    fs.writeFileSync(GENERATED_JSON_PATH, JSON.stringify(dataset, null, 4), "utf8");
};
