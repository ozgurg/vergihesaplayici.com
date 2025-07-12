const ensureClipboardApiSupport = (): void => {
    if (!("clipboard" in window.navigator)) {
        throw new Error("Clipboard API is not supported");
    }
};

const copyText = (text: string): Promise<void> => {
    ensureClipboardApiSupport();
    return window.navigator.clipboard.writeText(text);
};

const copyFile = (blob: Blob, mimeType: string): Promise<void> => {
    ensureClipboardApiSupport();
    return window.navigator.clipboard.write([
        new window.ClipboardItem({ [mimeType]: blob })
    ]);
};


export const copyUrlToClipboard = (url: URL): Promise<void> => {
    return copyText(url.href);
};

export const copyPngFileToClipboard = (blob: Blob): Promise<void> => {
    return copyFile(blob, "image/png");
};
