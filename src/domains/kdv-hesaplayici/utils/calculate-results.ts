import type { CalculationResults, Form, ResultList, ScreenshotData } from "@/domains/kdv-hesaplayici/types.js";
import { Calculator } from "@/domains/kdv-hesaplayici/calculator.js";
import { buildResultList } from "@/domains/kdv-hesaplayici/utils/build-result-list.js";
import { buildScreenshotData } from "@/domains/kdv-hesaplayici/utils/build-screenshot-data.js";

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
    const resultList = buildResultList(results, form);
    const screenshotData = buildScreenshotData(resultList);

    return {
        results,
        resultList,
        screenshotData
    };
};
