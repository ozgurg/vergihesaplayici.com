/**
 * @param {string} dataUrl
 * @returns {Promise<Blob>}
 */
export const dataUrlToBlob = dataUrl => fetch(dataUrl).then(response => response.blob());
