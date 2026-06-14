import type { APIRoute } from "astro";
import { KatmaDegerVergisiPageDef } from "@/domains/katma-deger-vergisi/page-def.js";

export const GET: APIRoute = async (): Promise<Response> => {
    return await calculatorPageOgImage(KatmaDegerVergisiPageDef());
};
