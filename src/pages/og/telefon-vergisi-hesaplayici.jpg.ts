import type { APIRoute } from "astro";
import { TelefonVergisiHesaplayiciPageDef } from "@/domains/telefon-vergisi-hesaplayici/page-def.js";

export const GET: APIRoute = async (): Promise<Response> => {
    return await calculatorPageOgImage(TelefonVergisiHesaplayiciPageDef());
};
