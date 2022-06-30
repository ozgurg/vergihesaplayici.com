import { parseUrlParts } from "@/utils/parse-url-parts.js";

/**
 * It's not cover parameterized URLs
 *
 * @param {string} path
 * @param {function(part: string)} titleMatcher
 * @return {[{title: string, to: string}]}
 */
const buildBreadcrumbsFromPath = (path, titleMatcher) => {
    const breadcrumbs = [];

    let fullPath = "";

    parseUrlParts(path).forEach(part => {
        fullPath = `${fullPath}/${part}`;

        breadcrumbs.push({
            title: titleMatcher(part),
            to: `${fullPath}/`
        });
    });

    return breadcrumbs;
};

export {
    buildBreadcrumbsFromPath
};
