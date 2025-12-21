import type { Form } from "@/domains/konsol-vergisi-hesaplayici/types.js";

export const DEFAULT_FORM: Form = {
    mode: "tax-added-to-tax-free",
    price: 0,
    currency: "TRY"
};

export const DEFAULT_PRESET_FORM: Form = {
    ...DEFAULT_FORM,
    mode: "tax-free-to-tax-added"
};

export const TAX_FREE_LABEL_BY_MODE = {
    "tax-added-to-tax-free": "Tahmini vergisiz fiyat",
    "tax-free-to-tax-added": "Vergisiz fiyat"
};

export const TAX_ADDED_LABEL_BY_MODE = {
    "tax-added-to-tax-free": "Vergili fiyat",
    "tax-free-to-tax-added": "Tahmini vergili fiyat"
};

export const PRICE_LABEL_BY_MODE = {
    "tax-added-to-tax-free": "Vergili konsol fiyatı",
    "tax-free-to-tax-added": "Vergisiz konsol fiyatı"
};

export const LAST_UPDATE = new Date("Sat Dec 20 2025 09:00:00 GMT+0300 (GMT+03:00)");
