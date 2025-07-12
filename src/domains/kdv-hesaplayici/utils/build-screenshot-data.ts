import type { ResultList, ScreenshotData } from "@/domains/kdv-hesaplayici/types.js";

export const buildScreenshotData = (results: ResultList): ScreenshotData => {
    return {
        input: [],
        output: results
    };
};
