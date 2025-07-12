import { toBlob, toCanvas } from "html-to-image";

const PIXEL_RATIO = 2;


export const htmlToCanvas = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
    return await toCanvas(element, {
        pixelRatio: PIXEL_RATIO
    });
};

export const htmlToBlob = async (element: HTMLElement): Promise<Blob> => {
    return await toBlob(element, {
        pixelRatio: PIXEL_RATIO
    }).then(blob => blob as Blob);
};
