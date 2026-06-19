import type { APIRoute } from "astro";
import { KonsolVergisiPageDef } from "@/domains/konsol-vergisi/page-def.js";

export const GET: APIRoute = async (): Promise<Response> => {
    return await calculatorPageOgImage(KonsolVergisiPageDef());
};
