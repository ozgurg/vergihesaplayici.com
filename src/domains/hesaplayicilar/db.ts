import type { CalculatorPage } from "@/types/page-def.js";
import { AracVergisiPageDef } from "@/domains/arac-vergisi/page-def.js";
import { TelefonVergisiHesaplayiciPageDef } from "@/domains/telefon-vergisi-hesaplayici/page-def.js";
import { KonsolVergisiHesaplayiciPageDef } from "@/domains/konsol-vergisi-hesaplayici/page-def.js";
import { GumrukVergisiPageDef } from "@/domains/gumruk-vergisi/page-def.js";
import { KdvHesaplayiciPageDef } from "@/domains/kdv-hesaplayici/page-def.js";
import { VerginiOlusturPageDef } from "@/domains/vergini-olustur/page-def.js";

export const getCalculatorPages = (): CalculatorPage[] => {
    return [
        TelefonVergisiHesaplayiciPageDef(),
        AracVergisiPageDef(),
        GumrukVergisiPageDef(),
        KdvHesaplayiciPageDef(),
        KonsolVergisiHesaplayiciPageDef(),
        VerginiOlusturPageDef()
    ];
};

export const getFeaturedCalculatorPages = (): CalculatorPage[] => {
    return [
        TelefonVergisiHesaplayiciPageDef(),
        AracVergisiPageDef(),
        GumrukVergisiPageDef(),
        KdvHesaplayiciPageDef(),
        KonsolVergisiHesaplayiciPageDef()
    ] as const;
};
