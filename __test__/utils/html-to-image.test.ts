import type { Mock } from "vitest";
import { describe, expect, it, vi } from "vitest";
import { toBlob, toCanvas } from "html-to-image";
import { htmlToBlob, htmlToCanvas } from "@/utils/html-to-image.js";

vi.mock("html-to-image", () => ({
    toCanvas: vi.fn(),
    toBlob: vi.fn()
}));

describe("utils/html-to-image.js", () => {
    describe("htmlToCanvas", () => {
        it("calls `html-to-image/toCanvas` with provided `HTMLElement` and options", async () => {
            const mockElement = document.createElement("div") as HTMLElement;
            const mockCanvas = document.createElement("canvas") as HTMLCanvasElement;
            const PIXEL_RATIO = 2;

            (toCanvas as Mock).mockResolvedValue(mockCanvas);

            const result = await htmlToCanvas(mockElement);

            expect(toCanvas).toHaveBeenCalledWith(mockElement, { pixelRatio: PIXEL_RATIO });
            expect(result).toBe(mockCanvas);
        });

        it("throws an error if `html-to-image/toCanvas` throws an error", async () => {
            const mockElement = document.createElement("div") as HTMLElement;
            const mockError = new Error("toCanvas failed");

            (toCanvas as Mock).mockRejectedValue(mockError);

            await expect(htmlToCanvas(mockElement)).rejects.toThrowError("toCanvas failed");
        });
    });

    describe("htmlToBlob", () => {
        it("calls `htmlToBlob` function and resolves a blob via `toBlob`", async () => {
            const mockElement = document.createElement("div") as HTMLElement;
            const mockBlob = new Blob();
            const PIXEL_RATIO = 2;

            (toBlob as Mock).mockResolvedValue(mockBlob);

            const result = await htmlToBlob(mockElement);

            expect(toBlob).toHaveBeenCalledWith(mockElement, { pixelRatio: PIXEL_RATIO });
            expect(result).toBe(mockBlob);
        });

        it("throws an error if `htmlToBlob` fails via `toBlob`", async () => {
            const mockElement = document.createElement("div") as HTMLElement;
            const mockError = new Error("toBlob failed");

            (toBlob as Mock).mockRejectedValue(mockError);

            await expect(htmlToBlob(mockElement)).rejects.toThrowError("toBlob failed");
        });
    });
});
