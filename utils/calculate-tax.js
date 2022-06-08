const calculateTaxFromTaxFreePrice = (taxFreePrice, taxRate) => {
    return parseFloat(((taxFreePrice / 100) * taxRate).toFixed(2));
};

const calculateTaxFromTaxAddedPrice = (taxAddedPrice, taxRate) => {
    return parseFloat((taxAddedPrice / (1 + (100 / taxRate))).toFixed(2));
};

export {
    calculateTaxFromTaxFreePrice,
    calculateTaxFromTaxAddedPrice
};
