import type { ExchangeRates } from "@/types/common.js";
import type { CalculationResults, ChartData, Form, ResultList, ScreenshotData } from "@/domains/arac-vergisi/types.js";
import { Calculator } from "@/domains/arac-vergisi/calculator.js";
import { buildResultList } from "@/domains/arac-vergisi/utils/build-result-list.js";
import { buildScreenshotData } from "@/domains/arac-vergisi/utils/build-screenshot-data.js";
import { buildChartData } from "@/domains/arac-vergisi/utils/build-chart-data.js";

export const calculateResults = (params: {
    form: Form,
    exchangeRates: ExchangeRates;
}): {
    results: CalculationResults;
    resultList: ResultList;
    screenshotData: ScreenshotData;
    chartData: ChartData;
} => {
    const { form, exchangeRates } = params;

    const price = form.price * exchangeRates.rates[form.currency];
    const {
        mode,
        vehicleType,
        vehicleEngineVolume
    } = form;

    const calculator = new Calculator({
        price,
        vehicleType,
        vehicleEngineVolume
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
