import type { ResultList, ScreenshotData } from "@/domains/gumruk-vergisi/types.js";

export const buildScreenshotData = (results: ResultList): ScreenshotData => {
    return {
        input: [],
        output: results
    };
};
