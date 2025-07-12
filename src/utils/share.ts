const ensureWebShareApiSupport = (): void => {
    if (!("share" in window.navigator)) {
        throw new Error("Web Share API is not supported");
    }
};

const share = (data: ShareData): Promise<void> => {
    ensureWebShareApiSupport();
    return window.navigator.share(data);
};


type ShareUrlParams = {
    text: ShareData["text"];
    url: URL;
};

export const shareUrl = (params: ShareUrlParams): Promise<void> => {
    return share({
        title: params.text,
        text: params.text,
        url: params.url.href
    });
};


type SharePngFileParams = {
    text: ShareData["text"];
    fileName: string;
    lastModifiedDate: Date;
    blob: Blob;
}

export const sharePngFile = (params: SharePngFileParams): Promise<void> => {
    const pngFile = new File(
        [params.blob],
        params.fileName,
        {
            type: "image/png",
            lastModified: params.lastModifiedDate.getTime()
        }
    );
    return share({
        title: params.text,
        text: params.text,
        files: [pngFile]
    });
};
