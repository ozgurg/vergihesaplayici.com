import { parseUrlParts } from "@/utils/parse-url-parts.js";

/**
 * It's not cover parameterized URLs.
 *
 * @param {string} path
 * @param {function(string): string} titleMatcher
 * @returns {{title: string, to: string}[]}
 */
const buildBreadcrumbsFromPath = (path, titleMatcher) => {
    const breadcrumbs = [];

    let fullPath = "";

    parseUrlParts(path).forEach(part => {
        fullPath = `${fullPath}/${part}`;

        const title = titleMatcher(part);
        const to = `${fullPath}/`;

        if (title) {
            breadcrumbs.push({
                title,
                to
            });
        }
    });

    return breadcrumbs;
};

export {
    buildBreadcrumbsFromPath
};
