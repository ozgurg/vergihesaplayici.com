import type { AstroYazilarCollection, Yazi } from "@/domains/yazilar/types.js";
import { COLLECTION_NAME } from "@/domains/yazilar/types.js";
import { getCollection } from "astro:content";

const sortYazilarByDate = (yazilar: Yazi[]): Yazi[] => {
    return yazilar.toSorted((a, b) => {
        const aUpdated = a.updatedDate ? a.updatedDate.getTime() : 0;
        const bUpdated = b.updatedDate ? b.updatedDate.getTime() : 0;

        if (aUpdated !== bUpdated) {
            return bUpdated - aUpdated;
        }

        return b.createdDate.getTime() - a.createdDate.getTime();
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
