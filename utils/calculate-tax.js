const calculateTaxFromTaxFreePrice = (taxFreePrice, taxRate) => {
    // TODO: Think about removing toFixed(2)
    return parseFloat(((taxFreePrice / 100) * taxRate).toFixed(2));
};

const calculateTaxFromTaxAddedPrice = (taxAddedPrice, taxRate) => {
    // TODO: Think about removing toFixed(2)
    return parseFloat((taxAddedPrice / (1 + (100 / taxRate))).toFixed(2));
};

const calculateTotalTaxRate = (taxFee, price) => {
    return ((taxFee / price) * 100);
};

export {
    calculateTaxFromTaxFreePrice,
    calculateTaxFromTaxAddedPrice,
    calculateTotalTaxRate
};
