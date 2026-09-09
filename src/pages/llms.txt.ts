import type { APIRoute } from "astro";
import { getCalculatorPages } from "@/domains/hesaplayicilar/db.js";
import {
    getBrandById as getPhoneBrand,
    getPresetsForAllBrands as getPhonePresets
} from "@/domains/telefon-vergisi/db.js";
import {
    getBrandById as getConsoleBrand,
    getPresetsForAllBrands as getConsolePresets
} from "@/domains/konsol-vergisi/db.js";
import { getYazilar } from "@/domains/yazilar/db.js";
import { KonsolVergisiPresetSlugPageDef } from "@/domains/konsol-vergisi/page-def.js";
import { TelefonVergisiPresetSlugPageDef } from "@/domains/telefon-vergisi/page-def.js";
import { YazilarSlugPageDef } from "@/domains/yazilar/page-def.js";

export const GET: APIRoute = async (): Promise<Response> => {
    const calculatorPages = getCalculatorPages();
    const phonePresets = getPhonePresets().filter(_preset => _preset.status === "active");
    const consolePresets = getConsolePresets().filter(_preset => _preset.status === "active");
    const yazilar = await getYazilar();

    const lines: string[] = [
        "# Vergi Hesaplayıcı",
        "",
        "> Türkiye'nin güncel vergi hesaplama ve mevzuat platformu. Otomobil, akıllı telefon, oyun konsolu, gümrük ve KDV gibi vergi türlerini güncel oranlarla hesaplar.",
        "",
        "Vergi Hesaplayıcı (vergihesaplayici.com), Türkiye'deki vergi mevzuatına göre vergi hesaplamalarını şeffaf ve anlaşılır bir şekilde sunar.",
        "",
        "## Hesaplayıcılar",
        ""
    ];

    for (const calculatorPage of calculatorPages) {
        lines.push(`- [${calculatorPage.title}](${calculatorPage.url.href}): ${calculatorPage.head.description}`);
    }

    lines.push("");
    lines.push("## Güncel Telefonlar");
    lines.push("");
    for (const preset of phonePresets) {
        const telefonVergisiPresetSlugPage = TelefonVergisiPresetSlugPageDef({
            preset,
            brand: getPhoneBrand(preset.brandId)
        });
        lines.push(`- [${telefonVergisiPresetSlugPage.brand.title} ${preset.title}](${telefonVergisiPresetSlugPage.url.href}): ${preset.pageDescription}`);
    }

    lines.push("");
    lines.push("## Güncel Oyun Konsolları");
    lines.push("");
    for (const preset of consolePresets) {
        const konsolVergisiPresetSlugPage = KonsolVergisiPresetSlugPageDef({
            preset,
            brand: getConsoleBrand(preset.brandId)
        });
        lines.push(`- [${konsolVergisiPresetSlugPage.brand.title} ${preset.title}](${konsolVergisiPresetSlugPage.url.href}): ${preset.pageDescription}`);
    }

    lines.push("");
    lines.push("## Önemli Vergi Rehberleri ve Yazılar");
    lines.push("");
    const latestArticles = yazilar.filter(_yazi => !/\[\d{4}\]$/u.test(_yazi.title)).slice(0, 20);
    for (const yazi of latestArticles) {
        const yazilarSlugPage = YazilarSlugPageDef({ yazi });
        lines.push(`- [${yazi.title}](${yazilarSlugPage.url.href}): ${yazi.description}`);
    }

    lines.push("");
    lines.push("## Resmi Vergi Kodları Kataloğu");
    lines.push("");
    lines.push(`- [Tüm Vergi Türleri Kataloğu](${siteUrl("/yazilar/vergi-turleri").href}): Türkiye'deki 0001-9901 kodlu resmi vergi türlerinin tam listesi ve açıklamaları.`);

    lines.push("");
    lines.push("## Ek Kaynaklar");
    lines.push("");
    lines.push(`- [Site Haritası](${staticSiteUrl("/sitemap-index.xml", false)})`);
    lines.push(`- [RSS Akışı](${staticSiteUrl("/rss.xml", false)})`);

    return new Response(lines.join("\n"), {
        headers: {
            "Content-Type": "text/plain; charset=utf-8"
        }
    });
};
