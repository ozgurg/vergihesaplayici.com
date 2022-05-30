const moneyFormat = (price, currency) => {
    return new Intl.NumberFormat("tr-TR",
        {
            style: "currency",
            currency,
            minimumFractionDigits: 2
        }).format(price);
};

export default (context, inject) => {
    inject("moneyFormat", moneyFormat);
};
