import { handleQuery, shouldShowResults } from "@/domain/kdv-hesaplayici/utils.js";
import { Mode } from "@/domain/kdv-hesaplayici/calculator.js";

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
                price: 599,
                rate: 18
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
                mode: Mode.TaxAddedPriceToTaxFreePrice,
                rate: 18,
                price: 599
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
                price: "599.99", // String
                rate: 18.5 // Float
            };
            const requirements2 = {
                modeOptions
            };
            expect(handleQuery(query2, requirements2)).toStrictEqual({
                price: 599.99, // Float
                rate: 18.5 // Float
            });
        });

        it("should return only valid properties", () => {
            const query = {
                price: 599, // Valid
                rate: 18,
                property1: {},
                property2: null,
                property3: 0,
                property4: "Hi"
            };
            const requirements = {
                modeOptions
            };
            expect(handleQuery(query, requirements)).toStrictEqual({
                rate: 18,
                price: 599
            });
        });
    });
});
