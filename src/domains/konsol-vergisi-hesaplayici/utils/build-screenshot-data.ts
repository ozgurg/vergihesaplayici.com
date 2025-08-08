import type { Form, ResultList, ScreenshotData } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import { PRICE_LABEL_BY_MODE } from "@/domains/konsol-vergisi-hesaplayici/config.js";

export const buildScreenshotData = (form: Form, results: ResultList): ScreenshotData => {
    return {
        input: [
            {
                label: PRICE_LABEL_BY_MODE[form.mode],
                value: formatMoney(form.price, form.currency),
                isNumeric: true
            }
        ],
        output: results
    };
};
