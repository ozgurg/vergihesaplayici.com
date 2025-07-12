import type { SvgIcon } from "@/types/common.js";

type CacheKey = `s${number}`;
type CacheValue = SvgIcon;

const cache = new Map<CacheKey, CacheValue>();
let idCounter = 1;

const findCacheKey = (svg: SvgIcon): CacheKey | null => {
    for (const [key, cacheItem] of cache) {
        if (cacheItem === svg) {
            return key;
        }
    }
    return null;
};


export const setSvgCache = (svg: SvgIcon): CacheKey => {
    let cacheKey = findCacheKey(svg);
    if (cacheKey === null) {
        cacheKey = `s${idCounter++}`;
        cache.set(cacheKey, svg);
    }
    return cacheKey;
};

export const getSvgCache = (): [CacheKey, CacheValue][] => {
    return [...cache.entries()];
};

export const svgToSymbol = (key: CacheKey, svg: CacheValue): string => {
    return svg
        .replace("<svg ", `<symbol id="${key}"`)
        .replace("</svg>", "</symbol>");
};
