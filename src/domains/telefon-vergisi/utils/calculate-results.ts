import type { ExchangeRates } from "@/types/common.js";
import type {
    CalculationResults,
    ChartData,
    Form,
    ResultList,
    ScreenshotData
} from "@/domains/telefon-vergisi/types.js";
import { Calculator } from "@/domains/telefon-vergisi/calculator.js";
import { buildResultList } from "@/domains/telefon-vergisi/utils/build-result-list.js";
import { buildScreenshotData } from "@/domains/telefon-vergisi/utils/build-screenshot-data.js";
import { buildChartData } from "@/domains/telefon-vergisi/utils/build-chart-data.js";

export const calculateResults = (params: {
    form: Form;
    exchangeRates: ExchangeRates;
}): {
    results: CalculationResults;
    resultList: ResultList;
    screenshotData: ScreenshotData;
    chartData: ChartData;
} => {
    const { form, exchangeRates } = params;

    const price = form.price * exchangeRates.rates[form.currency];
    const eurToTryCurrency = exchangeRates.rates.EUR;
    const { mode, registration } = form;

    const calculator = new Calculator({
        price,
        registration,
        eurToTryCurrency
    }, {
        mode
    });

    const results = calculator.calculate();
    const resultList = buildResultList(form, results);
    const screenshotData = buildScreenshotData(form, resultList);
    const chartData = buildChartData(form, results);

    return {
        results,
        resultList,
        screenshotData,
        chartData
    };
};
