import JsFileDownloader from "js-file-downloader";

/**
 * @param {string} url
 * @param {string} fileName
 * @returns {Promise<void>}
 */
const downloadFile = (url, fileName) => {
    return new JsFileDownloader({
        url,
        forceDesktopMode: true,
        nativeFallbackOnError: true,
        contentType: "image/png",
        nameCallback: () => fileName
    });
};

export {
    downloadFile
};
