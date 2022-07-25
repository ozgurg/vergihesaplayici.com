import JsFileDownloader from "js-file-downloader";

/**
 * @param {string} url
 * @param {function(string): string} nameCallback
 * @returns {Promise<void>}
 */
const downloadFile = (url, nameCallback) => {
    return new JsFileDownloader({
        url,
        forceDesktopMode: true,
        nativeFallbackOnError: true,
        contentType: "image/png",
        nameCallback
    });
};

export {
    downloadFile
};
