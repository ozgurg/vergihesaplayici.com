import { Mode } from "@/data/pages/kdv-hesaplayici/kdv-hesaplayici.calculator.js";

const modeOptions = [
    {
        title: "KDV hariç fiyattan KDV dahil fiyatı hesapla",
        value: Mode.TaxFreePriceToTaxAddedPrice
    },
    {
        title: "KDV dahil fiyattan KDV hariç fiyatı hesapla",
        value: Mode.TaxAddedPriceToTaxFreePrice
    }
];

export {
    modeOptions
};
