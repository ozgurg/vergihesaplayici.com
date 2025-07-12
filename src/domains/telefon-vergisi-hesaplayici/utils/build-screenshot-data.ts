import type { Form, ResultList, ScreenshotData } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { Registration } from "@/domains/telefon-vergisi-hesaplayici/types.js";

export const buildScreenshotData = (form: Form, results: ResultList): ScreenshotData => {
    const registration = {
        [Registration.IMPORT]: "İthalat ile",
        [Registration.PASSPORT]: "Pasaport ile"
    }[form.registration];
    return {
        input: [
            {
                label: "Telefon fiyatı",
                value: formatMoney(form.price, form.currency),
                isNumeric: true
            },
            {
                label: "Kayıt yolu",
                value: registration
            }
        ],
        output: results
    };
};
