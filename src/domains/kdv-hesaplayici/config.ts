import type { Form } from "@/domains/kdv-hesaplayici/types.js";
import { Mode } from "@/domains/kdv-hesaplayici/types.js";

export const DEFAULT_FORM: Form = {
    mode: Mode.TAX_FREE_TO_TAX_ADDED,
    price: 0,
    rate: 20
};
