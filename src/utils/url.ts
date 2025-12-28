import { version as PACKAGE_JSON_VERSION } from "@root/package.json";

type UrlPath = `/${string}`;

const BASE_URL = import.meta.env.SITE;


export const siteUrl = (path?: UrlPath): URL => {
    return new URL(
        path ? `${BASE_URL}${path}/` : `${BASE_URL}/`
    );
};

export const staticUrl = (path: UrlPath): URL => {
    return new URL(`${BASE_URL}${path}?v=${PACKAGE_JSON_VERSION}`);
};

export const staticSiteUrl = (path: UrlPath, withVersion = true): string => {
    const url = siteUrl(path).href.replace(/\/$/, "");
    if (withVersion) {
        return `${url}?v=${PACKAGE_JSON_VERSION}`;
    }
    return url;
};

export const isCurrentPage = (currentUrl: URL, pageUrl: URL): boolean => {
    return pageUrl.pathname === "/" ?
        currentUrl.href === pageUrl.href :
        currentUrl.href.startsWith(pageUrl.href.replace(/\/+$/, ""));
};

export const ariaCurrentValue = (currentUrl: URL, pageUrl: URL): "page" | "false" => {
    return isCurrentPage(currentUrl, pageUrl) ? "page" : "false";
};
