import type { toBlob, toCanvas } from "html-to-image";

const PIXEL_RATIO = 2;

let htmlToImagePromise: Promise<{ toBlob: typeof toBlob, toCanvas: typeof toCanvas }> | null = null;
const loadHtmlToImage = () => {
    htmlToImagePromise ??= import("html-to-image");
    return htmlToImagePromise;
};

export const htmlToCanvas = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
    const { toCanvas } = await loadHtmlToImage();
    return await toCanvas(element, {
        pixelRatio: PIXEL_RATIO
    });
};

export const htmlToBlob = async (element: HTMLElement): Promise<Blob> => {
    const { toBlob } = await loadHtmlToImage();
    return await toBlob(element, {
        pixelRatio: PIXEL_RATIO
    }).then(blob => blob as Blob);
};
