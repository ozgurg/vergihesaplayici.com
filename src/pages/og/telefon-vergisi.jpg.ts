import type { APIRoute } from "astro";
import { TelefonVergisiPageDef } from "@/domains/telefon-vergisi/page-def.js";

export const GET: APIRoute = async (): Promise<Response> => {
    return await calculatorPageOgImage(TelefonVergisiPageDef());
};
