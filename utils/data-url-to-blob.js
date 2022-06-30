/**
 * @param {string} dataUrl
 * @return {Promise<Blob>}
 */
const dataUrlToBlob = dataUrl => {
    return fetch(dataUrl).then(response => response.blob());
};

export {
    dataUrlToBlob
};
