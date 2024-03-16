import { describe, expect, it } from "vitest";
import { calculateMinimumWageDayCount, calculateMinimumWageMonthCount } from "@/utils/calculate-minimum-wage-count.js";

describe("utils/calculate-minimum-wage-count", () => {
    const minimumWage = 5_000;

    describe("calculateMinimumWageMonthCount", () => {
        it("should return 1.50 if price is 7.500", () => {
            const price = 7_500;
            expect(calculateMinimumWageMonthCount(price, minimumWage)).toBe("1.5");
        });

        it("should return 10.00 if price is 50.000", () => {
            const price = 50_000;
            expect(calculateMinimumWageMonthCount(price, minimumWage)).toBe("10.0");
        });
    });

    describe("calculateMinimumWageDayCount", () => {
        it("should return 15 if price is half of the minimum wage", () => {
            const price = minimumWage / 2;
            expect(calculateMinimumWageDayCount(price, minimumWage)).toBe("15");
        });

        it("should return 30 if price is same with the minimum wage", () => {
            const price = minimumWage;
            expect(calculateMinimumWageDayCount(price, minimumWage)).toBe("30");
        });

        it("should return 1 for one day price of the minimum wage", () => {
            const price = minimumWage / 30;
            expect(calculateMinimumWageDayCount(price, minimumWage)).toBe("1");
        });
    });
});
