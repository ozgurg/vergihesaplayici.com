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

export const getPricesJson = (): PricesDataset => {
    if (fs.existsSync(GENERATED_JSON_PATH)) {
        try {
            return JSON.parse(fs.readFileSync(GENERATED_JSON_PATH, "utf8")) as PricesDataset;
        } catch {
            return { updatedAt: "", prices: {} };
        }
    }
    return { updatedAt: "", prices: {} };
};

const getExchangeRates = async (): Promise<{ [currency: string]: number }> => {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = (await response.json()) as { rates: { [currency: string]: number } };
    return data.rates;
};

const tryExtractProductOffer = (
    scriptContent: string | undefined,
    country: Country
): {
    country: Country;
    currency: string;
    lowPrice: number;
} | null => {
    if (!scriptContent) {
        return null;
    }
    try {
        const data = JSON.parse(scriptContent);
        if (data?.["@type"] === "Product" && data?.offers) {
            const offer = Array.isArray(data.offers) ? data.offers[0] : data.offers;
            return {
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
): Promise<{
    country: Country;
    currency: string;
    lowPrice: number;
} | null> => {
    const url = `https://www.apple.com${country.prefix}/shop/buy-iphone/${slug}`;
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9"
            }
        });

        const html = await response.text();

        const scriptMatches = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu);
        for (const _match of scriptMatches) {
            const productOffer = tryExtractProductOffer(_match[1], country);
            if (productOffer) {
                return productOffer;
            }
        }

        // Special handling for China / Baidu JSON-LD format
        if (country.code === "cn") {
            const currentPriceMatches = [...html.matchAll(/class="[^"]*current_price[^"]*"[^>]*>(?:RMB|¥)\s*([0-9,]+)/giu)];
            const prices = currentPriceMatches
                .map(_match => Number.parseInt(_match[1]?.replaceAll(",", "") || "0", 10))
                .filter(_price => _price > 2_000);

            const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
            if (minPrice > 2_000) {
                return {
                    country,
                    currency: "CNY",
                    lowPrice: minPrice
                };
            }
        }
    } catch {
        // Ignore
    }
    return null;
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

    const modelEntries = await Promise.all(
        activePresets.map(async (_preset) => {
            const appleStoreSlug = getAppleStoreSlug(_preset.slug);

            const scraped = await Promise.all(Object.values(COUNTRIES).map(_country => scrapeAppleCountry(appleStoreSlug, _country)));
            const validScraped = scraped.filter((_price): _price is NonNullable<typeof _price> => _price !== null);

            const countryPrices: { [countryCode: string]: number } = {};
            for (const _realPrice of validScraped) {
                const rateToUsd = rates[_realPrice.currency] || 1;
                const priceUSD = _realPrice.currency === "USD" ? _realPrice.lowPrice : Math.round(_realPrice.lowPrice / rateToUsd);
                countryPrices[_realPrice.country.code] = priceUSD;
            }

            return {
                slug: _preset.slug,
                prices: countryPrices
            };
        })
    );

    for (const _entry of modelEntries) {
        dataset.prices[_entry.slug] = _entry.prices;
    }

    fs.writeFileSync(GENERATED_JSON_PATH, JSON.stringify(dataset, null, 4), "utf8");
};
