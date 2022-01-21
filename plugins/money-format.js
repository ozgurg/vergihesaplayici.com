export default (context, inject) => {
    inject("moneyFormat", (price, currency, minimumFractionDigits = 2) => {
        return new Intl.NumberFormat("tr-TR",
            {
                style: "currency",
                currency,
                minimumFractionDigits
            }).format(price);
    });
};
