import type { ExchangeRates } from "@/types/common.js";
import type { CalculationResults, Form, ResultList, ScreenshotData } from "@/domains/arac-vergisi/types.js";
import { Calculator } from "@/domains/arac-vergisi/calculator.js";
import { buildResultList } from "@/domains/arac-vergisi/utils/build-result-list.js";
import { buildScreenshotData } from "@/domains/arac-vergisi/utils/build-screenshot-data.js";

export const calculateResults = (params: {
    form: Form,
    exchangeRates: ExchangeRates;
}): {
    results: CalculationResults;
    resultList: ResultList;
    screenshotData: ScreenshotData;
} => {
    const { form, exchangeRates } = params;

    // oxlint-disable no-non-null-assertion
    const mode = form.mode;
    const price = form.price * exchangeRates.rates[form.currency];
    const vehicleType = form.vehicleType!;
    const vehicleEngineVolume = form.vehicleEngineVolume!;

    const calculator = new Calculator({
        price,
        vehicleType,
        vehicleEngineVolume
    }, {
        mode
    });

    const results = calculator.calculate();
    const resultList = buildResultList(results, form);
    const screenshotData = buildScreenshotData(form, resultList);

    return {
        results,
        resultList,
        screenshotData
    };
};
