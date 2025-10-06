import { describe, expect, it } from "vitest";
import { stringToHSL, stringToHue } from "@/utils/color.js";

describe("utils/color.js", () => {
    describe("stringToHue", () => {
        it("returns same hue for same string", () => {
            expect(stringToHue("abc")).toBe(stringToHue("abc"));
        });

        it("returns different hue for different strings", () => {
            expect(stringToHue("abc")).not.toBe(stringToHue("abd"));
        });

        it("wraps hue within 0-359", () => {
            const hue = stringToHue("a".repeat(1_000));
            expect(hue).toBeGreaterThanOrEqual(0);
            expect(hue).toBeLessThan(360);
        });

        it("convert string to hue", () => {
            expect(stringToHue("özgür")).toBe(117);
        });
    });

    describe("stringToHSL", () => {
        it("returns consistent HSL for same string", () => {
            expect(stringToHSL("test")).toEqual(stringToHSL("test"));
        });

        it("returns h, s, l within expected ranges", () => {
            const { h, s, l } = stringToHSL("example");
            expect(h).toBeGreaterThanOrEqual(0);
            expect(h).toBeLessThan(360);
            expect(s).toBeGreaterThanOrEqual(50);
            expect(s).toBeLessThan(100);
            expect(l).toBeGreaterThanOrEqual(40);
            expect(l).toBeLessThan(65);
        });

        it("produces different HSL values for different strings", () => {
            expect(stringToHSL("hello")).not.toEqual(stringToHSL("world"));
        });

        it("convert string to HSL color", () => {
            expect(stringToHSL("özgür")).toStrictEqual({
                h: 117,
                s: 82,
                l: 40
            });
        });
    });
});
