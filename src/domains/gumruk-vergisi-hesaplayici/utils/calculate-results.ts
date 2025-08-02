import type { ExchangeRates } from "@/types/common.js";
import type {
    CalculationResults,
    Form,
    ResultList,
    ScreenshotData
} from "@/domains/gumruk-vergisi-hesaplayici/types.js";
import { Calculator } from "@/domains/gumruk-vergisi-hesaplayici/calculator.js";
import { buildResultList } from "@/domains/gumruk-vergisi-hesaplayici/utils/build-result-list.js";
import { buildScreenshotData } from "@/domains/gumruk-vergisi-hesaplayici/utils/build-screenshot-data.js";

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
    const isOverTaxExemptionWeightLimit = form.isOverTaxExemptionWeightLimit;
    const isOverTaxExemptionPriceLimit = form.isOverTaxExemptionPriceLimit;
    const isPrintedOnly = form.isPrintedOnly;
    const isSpecialConsumptionTaxed = form.isSpecialConsumptionTaxed;
    const isFromEU = form.isFromEU;
    const isShippingIncluded = form.isShippingIncluded;
    const extraCustomTaxPercent = form.extraCustomTaxPercent;

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
    const resultList = buildResultList(results, form);
    const screenshotData = buildScreenshotData(resultList);

    return {
        results,
        resultList,
        screenshotData
    };
};
