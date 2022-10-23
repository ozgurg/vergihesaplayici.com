import { shouldShowResults } from "@/utils/calculator/phone-tax-calculator.js";

describe("utils/phone-tax-calculator", () => {
    describe("shouldShowResults", () => {
        it("should 'true' true for valid form object", () => {
            expect(shouldShowResults({
                price: 599,
                currency: "TRY",
                registration: "import"
            })).toBe(true);
        });

        it("should 'false' true for invalid form object", () => {
            // All
            expect(shouldShowResults({})).toBe(false);
            expect(shouldShowResults({
                price: null,
                currency: null,
                registration: null
            })).toBe(false);

            // price
            expect(shouldShowResults({ price: null })).toBe(false);
            expect(shouldShowResults({ price: 0 })).toBe(false);
            expect(shouldShowResults({ price: -1 })).toBe(false);
            expect(shouldShowResults({ price: "" })).toBe(false);

            // currency
            expect(shouldShowResults({ currency: null })).toBe(false);
            expect(shouldShowResults({ currency: "" })).toBe(false);

            // registration
            expect(shouldShowResults({ registration: null })).toBe(false);
            expect(shouldShowResults({ registration: "" })).toBe(false);
        });
    });
});
