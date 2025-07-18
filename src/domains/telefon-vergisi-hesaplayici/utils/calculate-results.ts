import type { ExchangeRates } from "@/types/common.js";
import type {
    CalculationResults,
    Form,
    ResultList,
    ScreenshotData
} from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { Calculator } from "@/domains/telefon-vergisi-hesaplayici/calculator.js";
import { buildResultList } from "@/domains/telefon-vergisi-hesaplayici/utils/build-result-list.js";
import { buildScreenshotData } from "@/domains/telefon-vergisi-hesaplayici/utils/build-screenshot-data.js";

export const calculateResults = (params: {
    form: Form;
    exchangeRates: ExchangeRates;
}): {
    results: CalculationResults;
    resultList: ResultList;
    screenshotData: ScreenshotData;
} => {
    const { form, exchangeRates } = params;

    const price = form.price * exchangeRates.rates[form.currency];
    const registration = form.registration;
    const eurToTryCurrency = exchangeRates.rates.EUR;
    const calculateFromTaxAddedPrice = form.currency === "TRY";

    const calculator = new Calculator({
        price,
        registration,
        eurToTryCurrency
    }, {
        calculateFromTaxAddedPrice
    });

    const results = calculator.calculate();
    const resultList = buildResultList(results, form.registration);
    const screenshotData = buildScreenshotData(form, resultList);

    return {
        results,
        resultList,
        screenshotData
    };
};
