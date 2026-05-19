import type { AstroYazilarCollection, Yazi } from "@/domains/yazilar/types.js";
import { COLLECTION_NAME } from "@/domains/yazilar/types.js";
import { getCollection } from "astro:content";

const sortYazilarByDate = (yazilar: Yazi[]): Yazi[] => {
    return yazilar.toSorted((a, b) => {
        const aDate = a.updatedDate ?? a.createdDate;
        const bDate = b.updatedDate ?? b.createdDate;
        return bDate.getTime() - aDate.getTime();
    });
};

const mapAstroYazilarCollectionAsYazilar = (yazilarCollection: AstroYazilarCollection): Yazi[] => {
    return yazilarCollection.map(_yaziCollectionItem => ({
        ..._yaziCollectionItem.data,
        slug: _yaziCollectionItem.id,
        entry: _yaziCollectionItem
    } as Yazi));
};

export const getYazilar = async (): Promise<Yazi[]> => {
    const astroYazilarCollection = (await getCollection(COLLECTION_NAME)) as AstroYazilarCollection;
    const yazilar = mapAstroYazilarCollectionAsYazilar(astroYazilarCollection);
    return sortYazilarByDate(yazilar);
};


const STOP_WORDS = new Set<string>([
    "ve", "bir", "ile", "için", "olan", "nedir", "nelerdir", "mi", "miyiz",
    "mu", "nasıl", "göre", "sayılı", "kanuna", "veya", "ise", "olarak",
    "en", "daha", "bu", "o", "şu", "da", "de", "ki", "ama", "fakat",
    "ancak", "yoksa", "hepsi", "her", "bazı", "tüm", "şöyle",
    "böyle", "miyim", "misin", "midir", "neler", "kim", "kimler",
    "ne", "zaman", "miyiz", "musunuz", "muhasebe", "kod", "kodu",
    "hakkında", "ile ilgili", "ilgili",
    "vergi", "vergisi", "vergiler", "vergileri", "vergilerin", "vergisine", "vergisidir"
]);

const tokenize = (text: string | undefined): string[] => {
    if (!text) {
        return [];
    }
    const lowercased = text.toLocaleLowerCase("tr");
    const cleaned = lowercased.replaceAll(/[^a-z0-9çğıöşü]/gu, " ");
    const words = cleaned.split(/\s+/u);
    return words.filter(_word => _word.length > 1 && !STOP_WORDS.has(_word));
};

const getTaxCode = (title: string): string | null => {
    const match = title.match(/\[([^\]]+)\]/u);
    return match ? (match[1]?.trim() ?? null) : null;
};

const intersectionSize = (setA: Set<string>, setB: Set<string>): number => {
    let count = 0;
    for (const _element of setA) {
        if (setB.has(_element)) {
            count++;
        }
    }
    return count;
};

export const getRelatedYazilar = (current: Yazi, all: Yazi[], limit = 6): Yazi[] => {
    const currentTitleTokens = new Set(tokenize(current.title));
    const currentDescTokens = new Set(tokenize(current.description));
    const currentBodyTokens = new Set(tokenize(current.entry.body));
    const currentCode = getTaxCode(current.title);

    const scored = all
        .filter(_yazi => _yazi.slug !== current.slug)
        .map(_yazi => {
            const titleTokens = new Set(tokenize(_yazi.title));
            const descTokens = new Set(tokenize(_yazi.description));
            const bodyTokens = new Set(tokenize(_yazi.entry.body));
            const itemCode = getTaxCode(_yazi.title);

            let score = 0;

            // 1. Title to Title matches (High weight)
            const titleTitleMatches = intersectionSize(currentTitleTokens, titleTokens);
            score += titleTitleMatches * 10;

            // 2. Title to Description / Description to Title
            const titleDescMatches = intersectionSize(currentTitleTokens, descTokens);
            const descTitleMatches = intersectionSize(currentDescTokens, titleTokens);
            score += (titleDescMatches + descTitleMatches) * 4;

            // 3. Title/Description to Body (linking content)
            const titleBodyMatches = intersectionSize(currentTitleTokens, bodyTokens);
            const bodyTitleMatches = intersectionSize(currentBodyTokens, titleTokens);
            score += (titleBodyMatches + bodyTitleMatches) * 2;

            // 4. Description to Description matches
            const descDescMatches = intersectionSize(currentDescTokens, descTokens);
            score += descDescMatches * 2;

            // 5. Body to Body matches (Lower weight)
            const bodyBodyMatches = intersectionSize(currentBodyTokens, bodyTokens);
            score += Math.min(bodyBodyMatches * .1, 5);

            // 6. "Vergi Türü" Bonus
            if (currentCode && itemCode) {
                score += 3; // Both are official "Vergi Türü" documents
                if (currentCode[0] === itemCode[0]) {
                    score += 4;
                }
                const currentNum = Number.parseInt(currentCode, 10);
                const itemNum = Number.parseInt(itemCode, 10);
                if (!Number.isNaN(currentNum) && !Number.isNaN(itemNum) && Math.abs(currentNum - itemNum) <= 10) {
                    score += 2;
                }
            }

            return { item: _yazi, score };
        });

    return scored
        .toSorted((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            const aDate = a.item.updatedDate ?? a.item.createdDate;
            const bDate = b.item.updatedDate ?? b.item.createdDate;
            return bDate.getTime() - aDate.getTime();
        })
        .slice(0, limit)
        .map(x => x.item);
};
