/**
 * @param {string} url
 * @param {string} fileName
 * @returns {Promise<void>}
 */
const downloadFile = (url, fileName) => {
    return new Promise(_resolve => {
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        return _resolve();
    });
};

export {
    downloadFile
};
