/**
 * @param {number} price
 * @return {number}
 */
const normalizePrice = price => {
    return parseFloat(price.toFixed(2));
};

export {
    normalizePrice
};
