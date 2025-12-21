import type { Brand, Preset } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import { buildPageMeta } from "@/domains/konsol-vergisi-hesaplayici/utils/build-page-meta.js";

const BRAND_ID = "asus";

export const brand: Brand = {
    id: BRAND_ID,
    title: "ASUS"
};

export const presets: Preset[] = [
    {
        brandId: BRAND_ID,
        title: "ROG Xbox Ally",
        slug: "asus-rog-xbox-ally",
        releaseDate: new Date("2025-10-16"),
        thumb: "asus-rog-xbox-ally.png",
        ...buildPageMeta("ASUS ROG Xbox Ally'nin"),
        disclaimerNote: "Bu ürün her ne kadar bir oyun konsoluna benzese de, eğer bilgisayar kategorisinden vergilendiriliyorsa bu sayfadaki hesaplama geçerli olmayacaktır.",
        options: [
            {
                title: "16GB – 512GB",
                form: {
                    mode: "tax-added-to-tax-free",
                    price: 37_999, // https://www.xbox.com/tr-TR/handhelds/rog-xbox-ally
                    currency: "TRY"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "ROG Xbox Ally X",
        slug: "asus-rog-xbox-ally-x",
        releaseDate: new Date("2025-10-16"),
        thumb: "asus-rog-xbox-ally-x.png",
        ...buildPageMeta("ASUS ROG Xbox Ally X'in"),
        disclaimerNote: "Bu ürün her ne kadar bir oyun konsoluna benzese de, eğer bilgisayar kategorisinden vergilendiriliyorsa bu sayfadaki hesaplama geçerli olmayacaktır.",
        options: [
            {
                title: "24GB – 1TB",
                form: {
                    mode: "tax-added-to-tax-free",
                    price: 58_999, // https://www.xbox.com/tr-TR/handhelds/rog-xbox-ally
                    currency: "TRY"
                }
            }
        ]
    }
];
