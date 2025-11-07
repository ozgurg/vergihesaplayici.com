import type { APIRoute } from "astro";
import { calculatorPageOgImage } from "@/utils/calculator-page-og-image.js";
import { VerginiOlusturPageDef } from "@/domains/vergini-olustur/page-def.js";

export const GET: APIRoute = async (): Promise<Response> => {
    return await calculatorPageOgImage(VerginiOlusturPageDef());
};
