import type { Form, ResultList, ScreenshotData } from "@/domains/arac-vergisi/types.js";
import {
    PRICE_LABEL_BY_MODE,
    VEHICLE_ENGINE_VOLUME_LABEL_BY_VEHICLE_ENGINE_VOLUME,
    VEHICLE_ENGINE_VOLUME_LABEL_BY_VEHICLE_TYPE,
    VEHICLE_TYPE_LABEL_BY_VEHICLE_TYPE
} from "@/domains/arac-vergisi/config.js";

export const buildScreenshotData = (form: Form, results: ResultList): ScreenshotData => {
    const input = [];
    input.push({
        label: PRICE_LABEL_BY_MODE[form.mode],
        value: formatMoney(form.price, form.currency),
        isNumeric: true
    });
    input.push({
        label: "Araç türü",
        value: VEHICLE_TYPE_LABEL_BY_VEHICLE_TYPE[form.vehicleType]
    });
    if (form.vehicleEngineVolume) {
        input.push({
            label: VEHICLE_ENGINE_VOLUME_LABEL_BY_VEHICLE_TYPE[form.vehicleType],
            value: VEHICLE_ENGINE_VOLUME_LABEL_BY_VEHICLE_ENGINE_VOLUME[form.vehicleEngineVolume]
        });
    }
    return {
        input: input,
        output: results
    };
};
