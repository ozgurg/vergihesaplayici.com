import type { ExchangeRates } from "@/types/common.js";

interface ImportMetaEnv {
    // `.env`
    readonly SERVER_HOST: string;
    readonly SERVER_PORT: number;

    readonly PUBLIC_FIREBASE_API_KEY: string;
    readonly PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    readonly PUBLIC_FIREBASE_DATABASE_URL: string;
    readonly PUBLIC_FIREBASE_PROJECT_ID: string;
    readonly PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    readonly PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
    readonly PUBLIC_FIREBASE_APP_ID: string;
    readonly PUBLIC_FIREBASE_MEASUREMENT_ID: string;

    readonly PUBLIC_RECAPTCHA_V3_PUBLIC_KEY: string;

    readonly PUBLIC_TINYADZ_SITE_ID: string;

    // `.env.(development|production|production|production.local)`
    readonly URL_BASE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare global {
    /* oxlint-disable no-var vars-on-top */
    // noinspection ES6ConvertVarToLetConst
    var __EXCHANGE_RATES__: ExchangeRates;
}
