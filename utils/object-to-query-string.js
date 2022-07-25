import querystring from "querystring";

/**
 * @param {object} object
 * @returns {string}
 */
const objectToQueryString = object => {
    return querystring.stringify(object);
};

export {
    objectToQueryString
};
