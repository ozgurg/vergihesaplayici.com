/**
 * @param {string} path
 * @return {string}
 */
const getFullUrl = path => {
    return `${process.env.APP_URL}${path}`;
};

export {
    getFullUrl
};
