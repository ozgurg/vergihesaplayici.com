import type { CalculationResults, Form, ResultList, ScreenshotData, TaxItem } from "@/domains/vergini-olustur/types.js";
import { Calculator } from "@/domains/vergini-olustur/calculator.js";
import { buildResultList } from "@/domains/vergini-olustur/utils/build-result-list.js";
import { buildScreenshotData } from "@/domains/vergini-olustur/utils/build-screenshot-data.js";
import type { ExchangeRates } from "@/types/common.js";

export const calculateResults = (params: {
    form: Form<TaxItem>;
    exchangeRates: ExchangeRates;
}): {
    results: CalculationResults;
    resultList: ResultList;
    screenshotData: ScreenshotData;
} => {
    const { form } = params;

    const basePrice = form.basePrice;
    const taxItems = [...form.taxItems.values()];
    const exchangeRates = params.exchangeRates;

    const calculator = new Calculator({
        basePrice,
        taxItems,
        exchangeRates
    });

    const results = calculator.calculate();
    const resultList = buildResultList(results);
    const screenshotData = buildScreenshotData(resultList);

    return {
        results,
        resultList,
        screenshotData
    };
};
