/**
 * @param {string} path
 * @returns {string[]}
 */
const parseUrlParts = path => {
    return path
        // .replace(/^\/|\/$/g, "") // Remove leading and trailing slashes (https://regexr.com/6opbs)
        .split("/")
        .filter(Boolean); // .replace(...) does parts clean but since we are used .filter(Boolean), .replace(...) is not needed
};

export {
    parseUrlParts
};
