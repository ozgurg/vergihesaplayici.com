/**
 * @param {string} fileName
 * @returns {string}
 */
const loadCustomIconAsHtml = fileName => require(`@/assets/icon/${fileName}?raw`);

/**
 * @param {string} fileName
 * @returns {boolean}
 */
const isCustomIcon = fileName => fileName.endsWith(".svg");

export {
    loadCustomIconAsHtml,
    isCustomIcon
};
