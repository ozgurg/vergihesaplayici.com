/**
 * @param {object} object
 * @returns {string}
 */
const objectToQueryString = object => {
    const objectToArray = [];
    for (const [name, values] of Object.entries(object)) {
        if (Array.isArray(values)) {
            values.forEach(value => {
                objectToArray.push([name, value]);
            });
        } else {
            objectToArray.push([name, values]);
        }
    }

    return new URLSearchParams(objectToArray).toString();
};

export {
    objectToQueryString
};
