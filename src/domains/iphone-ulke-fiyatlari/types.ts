import type { Preset } from "@/domains/telefon-vergisi/types.js";

export type Country<TCode extends Lowercase<string> = Lowercase<string>> = {
    code: TCode;
    prefix: "" | `/${Lowercase<string>}`;
    name: string;
    flag: string;
    currency: Uppercase<string>;
};

export type CountriesMap<T extends { [K in keyof T]: Country<K & Lowercase<string>> }> = T;

export type CountryPriceEntry = {
    priceUSD: number;
    priceLocal: number;
    currencyLocal: string;
};

export type CountryComparisonItem = {
    country: Country;
    priceUSD: number;
    priceLocal: number;
    currencyLocal: string;
    barPercentage: number;
    storeUrl: URL;
};

export type PricesDataset = {
    updatedAt: string;
    prices: {
        [slug: string]: {
            [countryCode: string]: CountryPriceEntry;
        };
    };
};

export type ComparisonResult = {
    preset: Omit<Preset, "brandId">;
    items: CountryComparisonItem[];
    maxPriceUSD: number;
};
