import type { Form } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import { Mode } from "@/domains/konsol-vergisi-hesaplayici/types.js";

export const DEFAULT_FORM: Form = {
    mode: Mode.TAX_ADDED_TO_TAX_FREE,
    price: 0,
    currency: "TRY"
};

export const DEFAULT_PRESET_FORM: Form = {
    ...DEFAULT_FORM,
    mode: Mode.TAX_FREE_TO_TAX_ADDED
};

export const TAX_FREE_LABEL_BY_MODE = {
    [Mode.TAX_ADDED_TO_TAX_FREE]: "Tahmini vergisiz fiyat",
    [Mode.TAX_FREE_TO_TAX_ADDED]: "Vergisiz fiyat"
};

export const TAX_ADDED_LABEL_BY_MODE = {
    [Mode.TAX_ADDED_TO_TAX_FREE]: "Vergili fiyat",
    [Mode.TAX_FREE_TO_TAX_ADDED]: "Tahmini vergili fiyat"
};

export const PRICE_LABEL_BY_MODE = {
    [Mode.TAX_ADDED_TO_TAX_FREE]: "Vergili konsol fiyatı",
    [Mode.TAX_FREE_TO_TAX_ADDED]: "Vergisiz konsol fiyatı"
};

export const LAST_UPDATE = new Date("Wed Jul 23 2025 23:00:00 GMT+0300 (GMT+03:00)");
