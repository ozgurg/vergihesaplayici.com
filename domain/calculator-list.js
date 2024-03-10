import { TelefonVergisiHesaplayiciPageDef } from "@/domain/telefon-vergisi-hesaplayici/index.page-def.js";
import { KonsolVergisiHesaplayiciPageDef } from "@/domain/konsol-vergisi-hesaplayici/index.page-def.js";
import { KdvHesaplayiciPageDef } from "@/domain/kdv-hesaplayici/index.page-def.js";

const calculators = {
    TelefonVergisiHesaplayici: TelefonVergisiHesaplayiciPageDef(),
    KonsolVergisiHesaplayici: KonsolVergisiHesaplayiciPageDef(),
    KdvHesaplayici: KdvHesaplayiciPageDef()
};

export {
    calculators
};
