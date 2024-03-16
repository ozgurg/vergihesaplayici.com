import { getDomainFromUrl } from "@/utils/get-domain-from-url.js";
import { describe, expect, it } from "vitest";

describe("utils/get-domain-from-url", () => {
    it("should return correct domain from URL", () => {
        const url1 = "https://vergihesaplayici.com/konsol-vergisi-hesaplayici/";
        expect(getDomainFromUrl(url1)).toBe("vergihesaplayici.com");

        const url2 = "https://vergihesaplayici.com";
        expect(getDomainFromUrl(url2)).toBe("vergihesaplayici.com");
    });
});
