/**
 * @param {string} fileName
 * @returns {string}
 */
const loadCustomIconAsHtml = fileName => require(`@/assets/icon/${fileName}?raw`);

export {
    loadCustomIconAsHtml
};
