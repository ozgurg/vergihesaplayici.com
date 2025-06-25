/**
 * @param {string} fileName
 * @returns {string}
 */
export const loadCustomIconAsHtml = fileName => require(`@/assets/icon/${fileName}?raw`);

/**
 * @param {string} fileName
 * @returns {boolean}
 */
export const isCustomIcon = fileName => fileName.endsWith(".svg");
