import { describe, expect, it, vi } from "vitest";
import { ariaCurrentValue, isCurrentPage, siteUrl, staticSiteUrl, staticUrl } from "@/utils/url.js";

describe("utils/url.js", () => {
    vi.mock("@root/package.json", () => ({ version: "1.2.3" }));

    describe("siteUrl", () => {
        it("returns base URL with a trailing slash when no path is provided", () => {
            expect(siteUrl().href).toBe("https://vergihesaplayici.com/");
        });

        it("returns base URL with a path and trailing slash", () => {
            expect(siteUrl("/foo").href).toBe("https://vergihesaplayici.com/foo/");
        });
    });

    describe("staticSiteUrl", () => {
        it("returns static site URL with a version query param", () => {
            expect(staticSiteUrl("/og-image.jpg")).toBe("https://vergihesaplayici.com/og-image.jpg?v=1.2.3");
        });

        it("returns static site URL without a version query param if `withVersion` is set to `false`", () => {
            expect(staticSiteUrl("/og-image.jpg", false)).toBe("https://vergihesaplayici.com/og-image.jpg");
        });
    });

    describe("staticUrl", () => {
        it("returns base URL with a path and version query param", () => {
            expect(staticUrl("/static-file.png").href).toBe("https://vergihesaplayici.com/static-file.png?v=1.2.3");
        });

        it("correctly appends version query parameter", () => {
            expect(staticUrl("/static-file.jpg").searchParams.get("v")).toBe("1.2.3");
        });
    });

    describe("isCurrentPage", () => {
        it("returns `true` for a root page exact match", () => {
            const current = new URL("https://vergihesaplayici.com/");
            const page = new URL("https://vergihesaplayici.com/");
            expect(isCurrentPage(current, page)).toBeTruthy();
        });

        it("returns `true` for a subpage prefix match", () => {
            const current = new URL("https://vergihesaplayici.com/foo/bar");
            const page = new URL("https://vergihesaplayici.com/foo");
            expect(isCurrentPage(current, page)).toBeTruthy();
        });

        it("returns `false` for non-matching pages", () => {
            const current = new URL("https://vergihesaplayici.com/foo");
            const page = new URL("https://vergihesaplayici.com/bar");
            expect(isCurrentPage(current, page)).toBeFalsy();
        });

        it("ignores trailing slashes when matching subpages", () => {
            const current = new URL("https://vergihesaplayici.com/foo/");
            const page = new URL("https://vergihesaplayici.com/foo");
            expect(isCurrentPage(current, page)).toBeTruthy();
        });
    });

    describe("ariaCurrentValue", () => {
        it("returns `page` if `isCurrentPage` is `true`", () => {
            const current = new URL("https://vergihesaplayici.com/foo");
            const page = new URL("https://vergihesaplayici.com/foo");
            expect(ariaCurrentValue(current, page)).toBe("page");
        });

        it("returns `false` if `isCurrentPage` is `false`", () => {
            const current = new URL("https://vergihesaplayici.com/foo");
            const page = new URL("https://vergihesaplayici.com/bar");
            expect(ariaCurrentValue(current, page)).toBe("false");
        });
    });
});
