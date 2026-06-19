import type { CalculationResults, Form, ResultList, ScreenshotData } from "@/domains/katma-deger-vergisi/types.js";
import { Calculator } from "@/domains/katma-deger-vergisi/calculator.js";
import { buildResultList } from "@/domains/katma-deger-vergisi/utils/build-result-list.js";
import { buildScreenshotData } from "@/domains/katma-deger-vergisi/utils/build-screenshot-data.js";

export const calculateResults = (params: {
    form: Form;
}): {
    results: CalculationResults;
    resultList: ResultList;
    screenshotData: ScreenshotData;
} => {
    const { form } = params;

    const {
        mode,
        price,
        rate
    } = form;

    const calculator = new Calculator({
        price,
        mode,
        rate
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
