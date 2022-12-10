/**
 * @param {object} object
 * @returns {string}
 */
const objectToQueryString = object => {
    const objectToArray = [];

    for (const [key, values] of Object.entries(object)) {
        if (Array.isArray(values)) {
            values.forEach(value => objectToArray.push([key, value]));
        } else {
            objectToArray.push([key, values]);
        }
    }

    return new URLSearchParams(objectToArray).toString();
};

export {
    objectToQueryString
};
