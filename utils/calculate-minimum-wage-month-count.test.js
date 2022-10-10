import { calculateMinimumWageMonthCount } from "@/utils/calculate-minimum-wage-month-count.js";

describe("utils/calculate-minimum-wage-month-count", () => {
    const minimumWage = 5_000;

    it("should return 1.50 if price is 7.500", () => {
        const price = 7_500;
        expect(calculateMinimumWageMonthCount(price, minimumWage)).toBe("1.50");
    });

    it("should return 10.00 if price is 50.000", () => {
        const price = 50_000;
        expect(calculateMinimumWageMonthCount(price, minimumWage)).toBe("10.00");
    });
});
