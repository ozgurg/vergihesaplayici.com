import type { APIRoute } from "astro";
import { calculatorPageOgImage } from "@/utils/calculator-page-og-image.js";
import { KdvHesaplayiciPageDef } from "@/domains/kdv-hesaplayici/page-def.js";

export const GET: APIRoute = async (): Promise<Response> => {
    return await calculatorPageOgImage(KdvHesaplayiciPageDef());
};
