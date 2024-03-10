import { TelefonVergisiHesaplayiciPageDef } from "@/page-def/telefon-vergisi-hesaplayici.page-def.js";
import { KonsolVergisiHesaplayiciPageDef } from "@/page-def/konsol-vergisi-hesaplayici.page-def.js";
import { KdvHesaplayiciPageDef } from "@/page-def/kdv-hesaplayici.page-def.js";

const calculators = {
    TelefonVergisiHesaplayici: TelefonVergisiHesaplayiciPageDef(),
    KonsolVergisiHesaplayici: KonsolVergisiHesaplayiciPageDef(),
    KdvHesaplayici: KdvHesaplayiciPageDef()
};

export {
    calculators
};
