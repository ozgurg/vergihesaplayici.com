import type { Form } from "@/domains/telefon-vergisi-hesaplayici/types.js";

export const DEFAULT_FORM: Form = {
    mode: "tax-added-to-tax-free",
    price: 0,
    currency: "TRY",
    registration: "import"
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
    "tax-added-to-tax-free": "Vergili telefon fiyatı",
    "tax-free-to-tax-added": "Vergisiz telefon fiyatı"
};

export const REGISTRATION_LABEL_BY_REGISTRATION = {
    "import": "İthalat ile",
    "passport": "Pasaport ile"
};

export const LAST_UPDATE = new Date("Fri Oct 24 2025 23:29:15 GMT+0300 (GMT+03:00)");
