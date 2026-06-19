const NUMBER_FORMATTER_LOCALE = "tr-TR";
const DATE_TIME_FORMATTER_LOCALE = "tr-TR";


export const normalizePrice = (price: number): number => {
    return Number.parseFloat(price.toFixed(2));
};


const moneyFormattersCache = new Map<string, Intl.NumberFormat>();

export const _UNIT_TEST_ONLY_clearMoneyFormattersCache = (): void => {
    moneyFormattersCache.clear();
};

export const formatMoney = (price: number, currency: string): string => {
    let formatter = moneyFormattersCache.get(currency);
    if (!formatter) {
        formatter = new Intl.NumberFormat(NUMBER_FORMATTER_LOCALE, {
            style: "currency",
            currency,
            minimumFractionDigits: 2
        });
        moneyFormattersCache.set(currency, formatter);
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
