import { normalizePrice } from "@/utils/normalize-price";

describe("utils/normalize-price", () => {
    it("should return a float", () => {
        expect(normalizePrice(1.23)).toEqual(1.23);
        expect(normalizePrice(1.2345)).toEqual(1.23);
        expect(normalizePrice(1.234567)).toEqual(1.23);
        expect(normalizePrice(1.2345678)).toEqual(1.23);
        expect(normalizePrice(1.23456789)).toEqual(1.23);
        expect(normalizePrice(1.234567890)).toEqual(1.23);
    });
});
