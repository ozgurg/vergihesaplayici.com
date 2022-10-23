/**
 * Decides whether to show the calculator results or not.
 * It doesn't validate the inputs. They must be validated before it can be used.
 *
 * @param {Object<*, *>} form
 * @returns {boolean}
 */
const shouldShowResults = form => {
    return form.price > 0 &&
        form.currency !== "" &&
        form.registration !== "";
};

export {
    shouldShowResults
};
