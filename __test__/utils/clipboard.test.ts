import { describe, expect, it, vi } from "vitest";
import { copyPngFileToClipboard, copyUrlToClipboard } from "@/utils/clipboard.js";

describe("utils/clipboard.js", () => {
    describe("copyUrlToClipboard", () => {
        const testUrl = new URL("https://vergihesaplayici.com");

        it("copies an URL to clipboard via Clipboard API", async () => {
            vi.stubGlobal("window", {
                navigator: {
                    clipboard: {
                        writeText: vi.fn()
                    }
                }
            });

            await copyUrlToClipboard(testUrl);

            expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(testUrl.href);
        });

        it("throws error if Clipboard API is not supported", () => {
            vi.unstubAllGlobals();
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

            vi.stubGlobal("window", {
                navigator: {
                    clipboard: {
                        write: vi.fn()
                    }
                },
                ClipboardItem: vi.fn().mockImplementation(() => mockClipboardItem)
            });

            await copyPngFileToClipboard(testBlob);

            expect(window.ClipboardItem).toHaveBeenCalledWith({
                "image/png": testBlob
            });
            expect(window.navigator.clipboard.write).toHaveBeenCalledWith([mockClipboardItem]);
        });

        it("throws error if Clipboard API is not supported", () => {
            vi.unstubAllGlobals();
            expect(() => {
                copyPngFileToClipboard(testBlob);
            }).toThrow("Clipboard API is not supported");
        });
    });
});
