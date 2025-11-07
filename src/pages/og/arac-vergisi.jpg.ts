import type { APIRoute } from "astro";
import { AracVergisiPageDef } from "@/domains/arac-vergisi/page-def.js";

export const GET: APIRoute = async (): Promise<Response> => {
    return await calculatorPageOgImage(AracVergisiPageDef());
};
