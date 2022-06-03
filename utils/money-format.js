const moneyFormat = (price, currency) => {
    const formatter = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency,
        minimumFractionDigits: 2
    });
    return formatter.format(price);
};

export default moneyFormat;
