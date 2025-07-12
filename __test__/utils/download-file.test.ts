import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { downloadFile } from "@/utils/download-file.js";

describe("utils/download-file.js", () => {
    describe("downloadFile", () => {
        let appendSpy: ReturnType<typeof vi.spyOn>;
        let createElementSpy: ReturnType<typeof vi.spyOn>;
        let clickMock: ReturnType<typeof vi.fn>;
        let removeMock: ReturnType<typeof vi.fn>;

        beforeEach(() => {
            clickMock = vi.fn();
            removeMock = vi.fn();

            const anchorMock = {
                href: "",
                download: "",
                click: clickMock,
                remove: removeMock
            } as unknown as HTMLAnchorElement;

            // @ts-expect-error: FIXME
            createElementSpy = vi.spyOn(document, "createElement").mockReturnValue(anchorMock);

            appendSpy = vi.spyOn(document.body, "append");
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it("creates an `<a />` element, sets its attrs, triggers a download, and removes it from the DOM", () => {
            const mockUrl = new URL("https://vergihesaplayici.com/test-file");
            const mockFileName = "test-file.txt";

            downloadFile(mockUrl, mockFileName);

            expect(createElementSpy).toHaveBeenCalledWith("a");

            const anchor = createElementSpy.mock.results[0]?.value;
            expect(anchor.href).toBe(mockUrl.href);
            expect(anchor.download).toBe(mockFileName);

            expect(appendSpy).toHaveBeenCalledWith(anchor);
            expect(clickMock).toHaveBeenCalled();
            expect(removeMock).toHaveBeenCalled();
        });
    });
});
