import { handleQuery, shouldShowResults } from "@/data/pages/kdv-hesaplayici/kdv-hesaplayici.utils.js";
import { Mode } from "@/data/pages/kdv-hesaplayici/kdv-hesaplayici.calculator.js";

describe("kdv-hesaplayici/utils", () => {
    const modeOptions = [
        {
            value: Mode.TaxFreePriceToTaxAddedPrice
        },
        {
            value: Mode.TaxAddedPriceToTaxFreePrice
        }
    ];

    describe("shouldShowResults", () => {
        it("should return 'true' for valid form object", () => {
            expect(shouldShowResults({
                price: 599
            })).toBe(true);
        });

        it("should return 'false' for invalid form object", () => {
            // All
            expect(shouldShowResults({})).toBe(false);
            expect(shouldShowResults({
                price: null
            })).toBe(false);

            // price
            expect(shouldShowResults({ price: null })).toBe(false);
            expect(shouldShowResults({ price: 0 })).toBe(false);
            expect(shouldShowResults({ price: -1 })).toBe(false);
            expect(shouldShowResults({ price: "" })).toBe(false);
        });
    });

    describe("handleQuery", () => {
        it("should return 'undefined' if query is falsy", () => {
            expect(handleQuery(null, {})).toBe(undefined);
        });

        it("should return valid \"handled query\" for valid query object", () => {
            const query = {
                price: 599,
                mode: Mode.TaxAddedPriceToTaxFreePrice
            };
            const requirements = {
                modeOptions
            };
            expect(handleQuery(query, requirements)).toStrictEqual(query);
        });

        it("should return valid \"handled query\" for invalid query object", () => {
            const query1 = {
                fiyat: 599,
                paraBirimi: "TRY",
                kayitYolu: "import"
            };
            const requirements1 = {
                modeOptions
            };
            expect(handleQuery(query1, requirements1)).toStrictEqual({});

            const query2 = {
                price: "599.99" // String
            };
            const requirements2 = {
                modeOptions
            };
            expect(handleQuery(query2, requirements2)).toStrictEqual({
                price: 599.99 // Float
            });
        });

        it("should return only valid properties", () => {
            const query = {
                price: 599, // Valid
                property1: {},
                property2: null,
                property3: 0,
                property4: "Hi"
            };
            const requirements = {
                modeOptions
            };
            expect(handleQuery(query, requirements)).toStrictEqual({
                price: 599
            });
        });
    });
});
