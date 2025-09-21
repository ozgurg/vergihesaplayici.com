import type { ExchangeRates } from "@/types/common.js";
import type { CalculationResults, Form, ResultList, ScreenshotData } from "@/domains/gumruk-vergisi/types.js";
import { Calculator } from "@/domains/gumruk-vergisi/calculator.js";
import { buildResultList } from "@/domains/gumruk-vergisi/utils/build-result-list.js";
import { buildScreenshotData } from "@/domains/gumruk-vergisi/utils/build-screenshot-data.js";

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
    const eurToTryCurrency = exchangeRates.rates.EUR;
    const {
        isOverTaxExemptionWeightLimit,
        isOverTaxExemptionPriceLimit,
        isPrintedOnly,
        isSpecialConsumptionTaxed,
        isFromEU,
        isShippingIncluded,
        extraCustomTaxPercent = 0
    } = form;

    const calculator = new Calculator({
        price,
        eurToTryCurrency,
        isOverTaxExemptionWeightLimit,
        isOverTaxExemptionPriceLimit,
        isPrintedOnly,
        isSpecialConsumptionTaxed,
        isFromEU,
        isShippingIncluded,
        extraCustomTaxPercent
    });

    const results = calculator.calculate();
    const resultList = buildResultList(form, results);
    const screenshotData = buildScreenshotData(resultList);

    return {
        results,
        resultList,
        screenshotData
    };
};
