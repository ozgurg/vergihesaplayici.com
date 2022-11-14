/**
 * @param {string} path
 * @returns {string}
 */
const getFullUrl = path => `${process.env.APP_URL}${path}`;

export {
    getFullUrl
};
