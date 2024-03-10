import TelefonVergisiHesaplayici from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.page.js";
import KonsolVergisiHesaplayici from "@/data/pages/konsol-vergisi-hesaplayici/konsol-vergisi-hesaplayici.page.js";
import { KdvHesaplayiciPageDef } from "@/page-def/kdv-hesaplayici.page-def.js";

const calculators = {
    TelefonVergisiHesaplayici,
    KonsolVergisiHesaplayici,
    KdvHesaplayici: KdvHesaplayiciPageDef()
};

export {
    calculators
};
