import type { ResultList, ScreenshotData } from "@/domains/vergini-olustur/types.js";

export const buildScreenshotData = (resultList: ResultList): ScreenshotData => {
    return {
        input: [],
        output: resultList.map(_item => ({
            label: _item.label,
            value: _item.value,
            isNumeric: true
        }))
    };
};
