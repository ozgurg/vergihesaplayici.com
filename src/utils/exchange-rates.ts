import type { CurrencyCode, ExchangeRates } from "@/types/common.js";

type ApiSuccessResponse = {
    result: "success";
    rates: {
        [key in CurrencyCode]: number;
    };
    time_last_update_utc: string;
};

type ApiErrorResponse = {
    result: "error";
    "error-type"?: string;
};

type ApiResponse = ApiErrorResponse | ApiSuccessResponse;

const API_BASE_URL = new URL("https://open.er-api.com/v6");

const FALLBACK_EXCHANGE_RATES: ExchangeRates = {
    dateUpdated: new Date(),
    rates: {
        TRY: 1,
        USD: 1,
        EUR: 1
    }
};

const fetchExchangeRate = async (): Promise<ExchangeRates> => {
    try {
        const apiUrl = `${API_BASE_URL.href}/latest/TRY`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.warn(`[exchange-rates] ❌ API request failed with status ${response.status}, using fallback rates`);
            return FALLBACK_EXCHANGE_RATES;
        }

        const json = await response.json() as ApiResponse;
        if (json?.result === "success") {
            return {
                dateUpdated: new Date(json.time_last_update_utc),
                rates: {
                    TRY: json?.rates?.TRY ?? 0,
                    USD: json?.rates?.USD ? 1 / json.rates.USD : 0,
                    EUR: json?.rates?.EUR ? 1 / json.rates.EUR : 0
                }
            };
        }
        throw new Error(json["error-type"] ?? "unknown");
    } catch (error) {
        if (import.meta.env.DEV && error instanceof TypeError && error.message.includes("fetch")) {
            console.warn(`[exchange-rates] ❌ Network error in development: ${error.message}, using fallback rates`);
            return FALLBACK_EXCHANGE_RATES;
        }
        throw error;
    }
};


export const API_PROVIDER_CREDIT = {
    url: new URL("https://www.exchangerate-api.com"),
    title: "Exchange Rate API"
};

export const initializeExchangeRates = async (): Promise<ExchangeRates> => {
    return await fetchExchangeRate();
};

export const getExchangeRates = (): ExchangeRates => {
    return window.__EXCHANGE_RATES__;
};
