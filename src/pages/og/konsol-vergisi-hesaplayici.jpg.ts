import type { APIRoute } from "astro";
import { calculatorPageOgImage } from "@/utils/calculator-page-og-image.js";
import { KonsolVergisiHesaplayiciPageDef } from "@/domains/konsol-vergisi-hesaplayici/page-def.js";

export const GET: APIRoute = async (): Promise<Response> => {
    return await calculatorPageOgImage(KonsolVergisiHesaplayiciPageDef());
};
