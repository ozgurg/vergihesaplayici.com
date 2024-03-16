import { describe, expect, it } from "vitest";
import { isCustomIcon } from "@/utils/custom-icon.js";

describe("utils/custom-icon", () => {
    describe("isCustomIcon", () => {
        it("should return 'true' or 'false' according to file name", () => {
            expect(isCustomIcon("file.html")).toBe(false);
            expect(isCustomIcon("file.png")).toBe(false);
            expect(isCustomIcon("file.SVG")).toBe(false);

            expect(isCustomIcon("file.svg")).toBe(true);
        });
    });
});
