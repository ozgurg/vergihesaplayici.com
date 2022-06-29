import JsFileDownloader from "js-file-downloader";

/**
 * @param {string} url
 * @param {string} name
 * @return {Promise<void>}
 */
const downloadFile = (url, name) => {
    return new JsFileDownloader({
        url,
        forceDesktopMode: true,
        nativeFallbackOnError: true,
        contentType: "image/png",
        nameCallback: name
    });
};

export {
    downloadFile
};
