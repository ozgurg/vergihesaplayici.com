import { AnaSayfa } from "@/data/pages/AnaSayfa.js";
import { Hesaplayicilar } from "@/data/pages/Hesaplayicilar.js";
import { TelefonVergisiHesaplayici } from "@/data/pages/TelefonVergisiHesaplayici.js";
import { KonsolVergisiHesaplayici } from "@/data/pages/KonsolVergisiHesaplayici.js";
import { KdvHesaplayici } from "@/data/pages/KdvHesaplayici.js";

const site = {
    AnaSayfa,
    Hesaplayicilar
};

const calculators = {
    TelefonVergisiHesaplayici,
    KonsolVergisiHesaplayici,
    KdvHesaplayici
};

export default (_, inject) => {
    inject("page", {
        ...site,
        ...calculators
    });
};

export {
    site,
    calculators
};
