import { parseUrlParts } from "@/utils/parse-url-parts.js";

describe("utils/parse-url-parts", () => {
    it("should parse URL parts", () => {
        const url1 = "/hesaplayicilar/telefon-vergisi-hesaplayici/";
        expect(parseUrlParts(url1)).toEqual(["hesaplayicilar", "telefon-vergisi-hesaplayici"]);

        const url2 = "/";
        expect(parseUrlParts(url2)).toEqual([]);
    });
});
