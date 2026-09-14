const NUMBER_FORMATTER_LOCALE = "tr-TR";
const DATE_TIME_FORMATTER_LOCALE = "tr-TR";


export const normalizePrice = (price: number): number => {
    return Number.parseFloat(price.toFixed(2));
};


const moneyFormattersCache = new Map<string, Intl.NumberFormat>();

export const _UNIT_TEST_ONLY_clearMoneyFormattersCache = (): void => {
    moneyFormattersCache.clear();
};

export type FormatMoneyOptions = {
    minimumFractionDigits?: number;
};

export const formatMoney = (
    price: number,
    currency: string,
    options?: FormatMoneyOptions
): string => {
    const minimumFractionDigits = options?.minimumFractionDigits ?? 2;
    const cacheKey = `${currency}:${minimumFractionDigits}`;
    let formatter = moneyFormattersCache.get(cacheKey);
    if (!formatter) {
        formatter = new Intl.NumberFormat(NUMBER_FORMATTER_LOCALE, {
            style: "currency",
            currency,
            minimumFractionDigits
        });
        moneyFormattersCache.set(cacheKey, formatter);
    }
    return formatter.format(price);
};


let numberFormatterCache: Intl.NumberFormat | null = null;

export const _UNIT_TEST_ONLY_clearNumberFormatterCache = (): void => {
    numberFormatterCache = null;
};

export const formatNumber = (number: number): string => {
    if (!numberFormatterCache) {
        numberFormatterCache = new Intl.NumberFormat(NUMBER_FORMATTER_LOCALE, {
            minimumFractionDigits: 2
        });
    }
    return numberFormatterCache.format(number);
};


let dateFormatterCache: Intl.DateTimeFormat | null = null;

export const _UNIT_TEST_ONLY_clearDateFormatterCache = (): void => {
    dateFormatterCache = null;
};

export const formatDate = (date: Date): string => {
    if (!dateFormatterCache) {
        dateFormatterCache = new Intl.DateTimeFormat(DATE_TIME_FORMATTER_LOCALE, {
            dateStyle: "full",
            timeStyle: "medium"
        });
    }
    return dateFormatterCache.format(date);
};
