import { describe, expect, it, vi } from "vitest";
import { getFullUrl } from "@/utils/get-full-url.js";

describe("utils/get-full-url", () => {
    vi.stubEnv("APP_URL", "https://vergihesaplayici.com");

    it("should return the full URL", () => {
        const path = "/calculator";
        const fullUrl = getFullUrl(path);
        expect(fullUrl).toBe(`${process.env.APP_URL}${path}`);
    });
});
