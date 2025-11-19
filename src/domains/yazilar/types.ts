import type { CollectionEntry } from "astro:content";
import { z } from "astro:content";

export const COLLECTION_NAME = "yazilar";

export const COLLECTION_PATH = "./src/content/yazilar";

export const Schema = z.object({
    title: z.string(),
    description: z.string(),
    createdDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional()
});

export type Yazi = {
    slug: string;
    title: string;
    description: string;
    createdDate: Date;
    updatedDate: Date | null;
    entry: AstroYazilarCollectionEntry;
}

export type AstroYazilarCollectionEntry = CollectionEntry<"yazilar">;

export type AstroYazilarCollection = AstroYazilarCollectionEntry[];
