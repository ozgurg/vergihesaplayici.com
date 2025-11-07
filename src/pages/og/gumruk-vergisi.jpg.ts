import type { APIRoute } from "astro";
import { calculatorPageOgImage } from "@/utils/calculator-page-og-image.js";
import { GumrukVergisiPageDef } from "@/domains/gumruk-vergisi/page-def.js";

export const GET: APIRoute = async (): Promise<Response> => {
    return await calculatorPageOgImage(GumrukVergisiPageDef());
};
