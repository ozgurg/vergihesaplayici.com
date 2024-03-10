import { handleQuery, shouldShowResults } from "@/domain/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.utils.js";

describe("telefon-vergisi-hesaplayici/utils", () => {
    describe("shouldShowResults", () => {
        it("should return 'true' for valid form object", () => {
            expect(shouldShowResults({
                price: 599,
                currency: "TRY",
                registration: "import"
            })).toBe(true);
        });

        it("should return 'false' for invalid form object", () => {
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

    describe("handleQuery", () => {
        it("should return 'undefined' if query is falsy", () => {
            expect(handleQuery(null, {})).toBe(undefined);
        });

        it("should return valid \"handled query\" for valid query object", () => {
            const query = {
                price: 599,
                currency: "TRY",
                registration: "import"
            };
            const requirements = {
                availableCurrencies: ["TRY"],
                registration: [
                    { value: "import" }
                ]
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
                availableCurrencies: [],
                registration: []
            };
            expect(handleQuery(query1, requirements1)).toStrictEqual({});

            const query2 = {
                price: "599.99" // String
            };
            const requirements2 = {
                availableCurrencies: [],
                registration: []
            };
            expect(handleQuery(query2, requirements2)).toStrictEqual({
                price: 599.99 // Float
            });
        });

        it("should return only valid properties", () => {
            const query = {
                price: 599, // Valid
                currency: "ABC",
                registration: "import", // Valid
                property1: {},
                property2: null,
                property3: 0,
                property4: "Hi"
            };
            const requirements = {
                availableCurrencies: ["TRY"],
                registration: [
                    { value: "import" }
                ]
            };
            expect(handleQuery(query, requirements)).toStrictEqual({
                price: 599,
                registration: "import"
            });
        });
    });
});
