/**
 * @param {string} path
 * @returns {string}
 */
const getFullUrl = path => {
    return `${process.env.APP_URL}${path}`;
};

export {
    getFullUrl
};
