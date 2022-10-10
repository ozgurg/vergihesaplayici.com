/**
 * @param {string} path
 * @returns {string[]}
 */
const parseUrlParts = path => path.split("/").filter(Boolean);

export {
    parseUrlParts
};
