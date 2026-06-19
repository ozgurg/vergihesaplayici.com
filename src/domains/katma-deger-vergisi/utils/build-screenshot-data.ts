import type { ResultList, ScreenshotData } from "@/domains/katma-deger-vergisi/types.js";

export const buildScreenshotData = (results: ResultList): ScreenshotData => {
    return {
        input: [],
        output: results
    };
};
