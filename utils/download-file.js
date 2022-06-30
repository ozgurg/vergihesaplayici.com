import JsFileDownloader from "js-file-downloader";

/**
 * @param {string} url
 * @param {function(fileName: string)} nameCallback
 * @return {Promise<void>}
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
