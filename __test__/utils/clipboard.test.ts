import { describe, expect, it, vi } from "vitest";
import { copyPngFileToClipboard, copyUrlToClipboard } from "@/utils/clipboard.js";

describe("utils/clipboard.js", () => {
    describe("copyUrlToClipboard", () => {
        const testUrl = new URL("https://vergihesaplayici.com");

        it("copies an URL to clipboard via Clipboard API", async () => {
            const writeText = vi.fn();
            Object.defineProperty(window.navigator, "clipboard", {
                value: { writeText },
                writable: true,
                configurable: true
            });

            await copyUrlToClipboard(testUrl);

            expect(writeText).toHaveBeenCalledWith(testUrl.href);
        });

        it("throws error if Clipboard API is not supported", () => {
            // @ts-expect-error test unsupported clipboard API
            delete window.navigator.clipboard;
            expect(() => {
                copyUrlToClipboard(testUrl);
            }).toThrow("Clipboard API is not supported");
        });
    });

    describe("copyPngFileToClipboard", () => {
        const testBlob = new Blob();

        it("copies a PNG file to clipboard via Clipboard API", async () => {
            const mockClipboardItem = {
                items: {},
                getType: vi.fn().mockResolvedValue(new Blob())
            };

            class MockClipboardItem {
                constructor() {
                    return mockClipboardItem;
                }
            }

            const write = vi.fn();
            Object.defineProperty(window.navigator, "clipboard", {
                value: { write },
                writable: true,
                configurable: true
            });
            Object.defineProperty(window, "ClipboardItem", {
                value: MockClipboardItem,
                writable: true,
                configurable: true
            });

            await copyPngFileToClipboard(testBlob);

            expect(write).toHaveBeenCalledWith([mockClipboardItem]);
        });

        it("throws error if Clipboard API is not supported", () => {
            // @ts-expect-error test unsupported clipboard API
            delete window.navigator.clipboard;
            expect(() => {
                copyPngFileToClipboard(testBlob);
            }).toThrow("Clipboard API is not supported");
        });
    });
});
