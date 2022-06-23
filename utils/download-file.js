import JsFileDownloader from "js-file-downloader";

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
