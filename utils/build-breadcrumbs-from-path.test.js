import { buildBreadcrumbsFromPath } from "@/utils/build-breadcrumbs-from-path.js";

describe("utils/build-breadcrumbs-from-path", () => {
    const routeTitles = {
        "hesaplayicilar": "Hesaplayıcılar",
        "konsol-vergisi-hesaplayici": "Konsol Vergisi Hesaplayici"
    };

    const titleMatcher = part => routeTitles[part];

    it("should build breadcrumbs from path", () => {
        const path1 = "/hesaplayicilar";
        expect(buildBreadcrumbsFromPath(path1, titleMatcher)).toEqual([
            {
                title: "Hesaplayıcılar",
                to: "/hesaplayicilar"
            }
        ]);

        const path2 = "/hesaplayicilar/konsol-vergisi-hesaplayici";
        expect(buildBreadcrumbsFromPath(path2, titleMatcher)).toEqual([
            {
                title: "Hesaplayıcılar",
                to: "/hesaplayicilar"
            },
            {
                title: "Konsol Vergisi Hesaplayici",
                to: "/hesaplayicilar/konsol-vergisi-hesaplayici"
            }
        ]);
    });
});
