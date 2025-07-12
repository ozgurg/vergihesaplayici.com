import type { Form, ResultList, ScreenshotData } from "@/domains/konsol-vergisi-hesaplayici/types.js";

export const buildScreenshotData = (form: Form, results: ResultList): ScreenshotData => {
    return {
        input: [
            {
                label: "Konsol fiyatı",
                value: formatMoney(form.price, form.currency),
                isNumeric: true
            }
        ],
        output: results
    };
};
