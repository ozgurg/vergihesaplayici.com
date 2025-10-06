import type { AstroYazilarCollection, Yazi } from "@/domains/yazilar/types.js";
import { COLLECTION_NAME } from "@/domains/yazilar/types.js";
import { getCollection } from "astro:content";

const sortYazilarByDate = (yazilar: Yazi[]): Yazi[] => {
    return yazilar.toSorted((_y1, _y2) => _y2.date.getTime() - _y1.date.getTime());
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
