import { TelefonVergisiHesaplayiciPageDef } from "@/page-def/telefon-vergisi-hesaplayici.page-def.js";
import KonsolVergisiHesaplayici from "@/data/pages/konsol-vergisi-hesaplayici/konsol-vergisi-hesaplayici.page.js";
import { KdvHesaplayiciPageDef } from "@/page-def/kdv-hesaplayici.page-def.js";

const calculators = {
    TelefonVergisiHesaplayici: TelefonVergisiHesaplayiciPageDef(),
    KonsolVergisiHesaplayici,
    KdvHesaplayici: KdvHesaplayiciPageDef()
};

export {
    calculators
};
