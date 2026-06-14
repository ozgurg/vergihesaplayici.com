import type { Form, ResultList, ScreenshotData } from "@/domains/telefon-vergisi/types.js";
import {
    REGISTRATION_LABEL_BY_REGISTRATION,
    PRICE_LABEL_BY_MODE
} from "@/domains/telefon-vergisi/config.js";

export const buildScreenshotData = (form: Form, results: ResultList): ScreenshotData => {
    return {
        input: [
            {
                label: PRICE_LABEL_BY_MODE[form.mode],
                value: formatMoney(form.price, form.currency),
                isNumeric: true
            },
            {
                label: "Kayıt yolu",
                value: REGISTRATION_LABEL_BY_REGISTRATION[form.registration]
            }
        ],
        output: results
    };
};
