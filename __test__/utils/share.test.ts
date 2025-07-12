import { describe, expect, it, vi } from "vitest";
import { sharePngFile, shareUrl } from "@/utils/share.js";

describe("utils/share.js", () => {
    describe("shareUrl", () => {
        const testParams = {
            text: "Vergi Hesaplayıcı",
            url: new URL("https://vergihesaplayici.com")
        };

        it("shares an URL via Web Share API", async () => {
            vi.stubGlobal("window", {
                navigator: {
                    share: vi.fn()
                }
            });

            await shareUrl(testParams);

            expect(window.navigator.share).toHaveBeenCalledWith({
                text: testParams.text,
                title: testParams.text,
                url: testParams.url.href
            });
        });

        it("throws error if Web Share API is not supported", () => {
            vi.unstubAllGlobals();
            expect(() => {
                shareUrl(testParams);
            }).toThrow("Web Share API is not supported");
        });
    });

    describe("sharePngFile", () => {
        const testParams = {
            text: "Vergi Hesaplayıcı",
            fileName: "vergihesaplayici.png",
            lastModifiedDate: new Date(),
            blob: new Blob()
        };

        it("shares a PNG file via Web Share API", async () => {
            vi.stubGlobal("window", {
                navigator: {
                    share: vi.fn()
                }
            });

            await sharePngFile(testParams);

            expect(window.navigator.share).toHaveBeenCalledWith({
                title: testParams.text,
                text: testParams.text,
                files: [
                    new File(
                        [testParams.blob],
                        testParams.fileName,
                        {
                            type: "image/png",
                            lastModified: testParams.lastModifiedDate.getTime()
                        }
                    )
                ]
            });
        });

        it("throws error if Web Share API is not supported", () => {
            vi.unstubAllGlobals();
            expect(() => {
                sharePngFile(testParams);
            }).toThrow("Web Share API is not supported");
        });
    });
});
