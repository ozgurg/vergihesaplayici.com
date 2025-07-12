// oxlint-disable-next-line extensions
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { COLLECTION_NAME, COLLECTION_PATH, Schema } from "@/domains/yazilar/types.js";

export const collections = {
    [COLLECTION_NAME]: defineCollection({
        loader: glob({
            base: COLLECTION_PATH,
            pattern: "**/*.md"
        }),
        schema: Schema
    })
};
