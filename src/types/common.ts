export type HtmlString = string;

export type SvgFile = `${string}.svg`;

export type SvgIcon = string;

export type Icon = SvgFile | SvgIcon;


export type ExchangeRates = {
    dateUpdated: Date;
    rates: {
        TRY: number;
        USD: number;
        EUR: number;
    }
};

export type CurrencyCode = keyof ExchangeRates["rates"];


export type HSLColor = { h: number; s: number; l: number };

export type RGBColor = { r: number; g: number; b: number };


export type Head = {
    title: string | null;
    description: string;
    canonicalUrl: URL;
    ogImageUrl: ReturnType<typeof staticSiteUrl> | null;
};
