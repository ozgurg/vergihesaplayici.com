/**
 * @param {string} dataUrl
 * @returns {Promise<Blob>}
 */
const dataUrlToBlob = dataUrl => fetch(dataUrl).then(response => response.blob());

export {
    dataUrlToBlob
};
