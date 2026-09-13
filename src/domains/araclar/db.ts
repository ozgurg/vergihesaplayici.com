import type { UtilityPage } from "@/types/page-def.js";
import { IphoneUlkeFiyatlariPageDef } from "@/domains/iphone-ulke-fiyatlari/page-def.js";

export const getUtilityPages = (): UtilityPage[] => {
    return [
        IphoneUlkeFiyatlariPageDef()
    ];
};
