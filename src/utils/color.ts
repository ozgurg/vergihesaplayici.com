import type { HSLColor } from "@/types/common.js";

export const stringToHue = (string: string): HSLColor["h"] => {
    let hue = 0;
    for (let i = 0; i < string.length; i++) {
        // oxlint-disable-next-line no-non-null-assertion
        hue = (hue + string.codePointAt(i)!) % 360;
    }
    return hue;
};

export const stringToHSL = (string: string): HSLColor => {
    const h = stringToHue(string);
    const s = 50 + (stringToHue(string + "s") % 50);
    const l = 40 + (stringToHue(string + "l") % 25);
    return { h, s, l };
};
