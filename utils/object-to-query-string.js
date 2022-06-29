import querystring from "querystring";

/**
 * @param {object} object
 * @return {string}
 */
const objectToQueryString = object => {
    return querystring.stringify(object);
};

export {
    objectToQueryString
};
