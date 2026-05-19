import { describe, expect, it } from "vitest";
import {
    calculateReadingTimeInMinutes,
    getWordCount,
    parseDate,
    parseTitleAsTaxInfo
} from "@/domains/yazilar/utils.js";

describe("domains/yazilar/utils/utils.js", () => {
    describe("parseTitleAsTaxInfo", () => {
        it("should parse tax name and code from correct title format", () => {
            expect(parseTitleAsTaxInfo("Gelir Vergisi [0011]")).toEqual({
                name: "Gelir Vergisi",
                code: "0011"
            });
        });

        it("should trim whitespaces from both name and code", () => {
            expect(parseTitleAsTaxInfo("   Katma Değer Vergisi    [ 3015 ]   ")).toEqual({
                name: "Katma Değer Vergisi",
                code: "3015"
            });
        });

        it("should return `false` if there are no brackets", () => {
            expect(parseTitleAsTaxInfo("Kurumlar Vergisi")).toBe(false);
        });

        it("should return `false` if the code inside brackets is empty", () => {
            expect(parseTitleAsTaxInfo("Gelir Vergisi []")).toBe(false);
            expect(parseTitleAsTaxInfo("Gelir Vergisi [   ]")).toBe(false);
        });

        it("should return `false` if the name is empty or only whitespace", () => {
            expect(parseTitleAsTaxInfo("[0011]")).toBe(false);
            expect(parseTitleAsTaxInfo("   [0011]")).toBe(false);
        });

        it("should return `false` if text exists after the bracket", () => {
            expect(parseTitleAsTaxInfo("Gelir Vergisi [0011] extra")).toBe(false);
        });

        it("should return `false` if brackets contain backslashes", () => {
            expect(parseTitleAsTaxInfo(String.raw`Gelir Vergisi [00\11]`)).toBe(false);
        });
    });

    describe("parseDate", () => {
        it("should return correctly structured `timeDateTimeAttr` and `readableDate` in `tr-TR` locale", () => {
            const date = new Date(Date.UTC(2_026, 4, 19, 12, 0, 0));
            const result = parseDate(date);

            expect(result.timeDateTimeAttr).toBe(date.toISOString().split("T")[0]);
            expect(result.readableDate).toBe(date.toLocaleDateString("tr-TR"));
        });
    });

    describe("getWordCount", () => {
        it("should return `0` for an empty or whitespace-only string", () => {
            expect(getWordCount("")).toBe(0);
            expect(getWordCount("   ")).toBe(0);
            expect(getWordCount("\n\t\r")).toBe(0);
        });

        it("should return `1` for a single word", () => {
            expect(getWordCount("Merhaba")).toBe(1);
            expect(getWordCount("  Merhaba  ")).toBe(1);
        });

        it("should return correct count for multiple words split by spaces", () => {
            expect(getWordCount("Merhaba dünya")).toBe(2);
            expect(getWordCount("Merhaba   dünya ")).toBe(2);
        });

        it("should handle newlines and tabs as separators", () => {
            expect(getWordCount("Merhaba\ndünya\tve\rherkes")).toBe(4);
        });

        it("should count special characters and punctuation attached to words as part of the word", () => {
            expect(getWordCount("Merhaba, dünya!")).toBe(2);
        });
    });

    describe("calculateReadingTimeInMinutes", () => {
        it("should return `1` minute for `0` or small number of words", () => {
            expect(calculateReadingTimeInMinutes(0)).toBe(1);
            expect(calculateReadingTimeInMinutes(10)).toBe(1);
            expect(calculateReadingTimeInMinutes(199)).toBe(1);
        });

        it("should return `1` minute for exactly the `wordsPerMinute` value", () => {
            expect(calculateReadingTimeInMinutes(200)).toBe(1);
        });

        it("should round up for values above `wordsPerMinute` limit", () => {
            expect(calculateReadingTimeInMinutes(201)).toBe(2);
            expect(calculateReadingTimeInMinutes(399)).toBe(2);
            expect(calculateReadingTimeInMinutes(400)).toBe(2);
            expect(calculateReadingTimeInMinutes(401)).toBe(3);
        });

        it("should support a custom `wordsPerMinute` value", () => {
            expect(calculateReadingTimeInMinutes(100, 50)).toBe(2);
            expect(calculateReadingTimeInMinutes(101, 50)).toBe(3);
            expect(calculateReadingTimeInMinutes(25, 50)).toBe(1);
        });
    });
});
