import type { CalculatorPage } from "@/types/page-def.js";
import { TelefonVergisiHesaplayiciPageDef } from "@/domains/telefon-vergisi-hesaplayici/page-def.js";
import { KonsolVergisiHesaplayiciPageDef } from "@/domains/konsol-vergisi-hesaplayici/page-def.js";
import { KdvHesaplayiciPageDef } from "@/domains/kdv-hesaplayici/page-def.js";
import { VerginiOlusturPageDef } from "@/domains/vergini-olustur/page-def.js";

export const CalculatorPages: CalculatorPage[] = [
    TelefonVergisiHesaplayiciPageDef(),
    KonsolVergisiHesaplayiciPageDef(),
    KdvHesaplayiciPageDef(),
    VerginiOlusturPageDef()
] as const;
