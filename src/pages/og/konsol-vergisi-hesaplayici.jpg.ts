import type { APIRoute } from "astro";
import { KonsolVergisiHesaplayiciPageDef } from "@/domains/konsol-vergisi-hesaplayici/page-def.js";

export const GET: APIRoute = async (): Promise<Response> => {
    return await calculatorPageOgImage(KonsolVergisiHesaplayiciPageDef());
};
