import { describe, expect, it } from "vitest";
import { pickRandomPlaceholder, PLACEHOLDERS } from "@/domains/vergini-olustur/utils/pick-random-placeholder.js";

describe("domains/vergini-olustur/utils/pick-random-placeholder.js", () => {
    describe("pickRandomPlaceholder", () => {
        it("returns a valid placeholder from the list", () => {
            const result = pickRandomPlaceholder();
            expect(PLACEHOLDERS).toContain(result);
        });

        it("returns different values on multiple calls", () => {
            const results = new Set<string>();

            // Call the function multiple times to test randomness
            for (let i = 0; i < Math.min(10, PLACEHOLDERS.length); i++) {
                results.add(pickRandomPlaceholder());
            }

            // We should get at least 2 different results (unless `PLACEHOLDERS.length === 1`)
            if (PLACEHOLDERS.length > 1) {
                expect(results.size).toBeGreaterThan(1);
            }
        });

        it("eventually cycles through all placeholders", () => {
            const results: string[] = [];

            const totalCalls = PLACEHOLDERS.length * 2; // Call enough times to cycle through twice
            for (let i = 0; i < totalCalls; i++) {
                results.push(pickRandomPlaceholder());
            }

            // Check that all placeholders appear at least once
            for (const _placeholder of PLACEHOLDERS) {
                expect(results).toContain(_placeholder);
            }
        });

        it("maintains queue behavior correctly", () => {
            // Reset by calling enough times to exhaust the queue
            for (const _ of PLACEHOLDERS) {
                pickRandomPlaceholder();
            }

            // Now we should get the first item from a new shuffled queue
            const result = pickRandomPlaceholder();
            expect(PLACEHOLDERS).toContain(result);
        });

        it("returns `PLACEHOLDERS[0]` if placeholder is `undefined`", () => {
            const editablePlaceholders = PLACEHOLDERS as any;
            const originalContent = [...editablePlaceholders];

            editablePlaceholders.length = 0;
            try {
                // Call enough times to exhaust the remaining queue and trigger a new shuffle of the empty array
                for (const _ of originalContent) {
                    pickRandomPlaceholder();
                }
                const result = pickRandomPlaceholder();
                expect(result).toBeUndefined();
            } finally {
                editablePlaceholders.length = originalContent.length;
                for (let i = 0; i < originalContent.length; i++) {
                    editablePlaceholders[i] = originalContent[i];
                }
            }
        });
    });
});
