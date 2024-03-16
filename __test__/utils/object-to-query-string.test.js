import { objectToQueryString } from "@/utils/object-to-query-string.js";
import { describe, expect, it } from "vitest";

describe("utils/object-to-query-string", () => {
    const object = {
        price: 100,
        currency: "USD"
    };

    const objectWithArray = {
        price: 100,
        currency: "USD",
        options: [
            1, 2
        ]
    };

    it("should return a valid query string", () => {
        expect(objectToQueryString(object)).toBe("price=100&currency=USD");
    });

    it("should return a valid query string with array", () => {
        expect(objectToQueryString(objectWithArray)).toBe("price=100&currency=USD&options=1&options=2");
    });
});
