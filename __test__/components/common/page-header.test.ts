import { describe } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import PageHeader from "@/components/common/page-header.vue";

describe("components/common/page-header.vue", () => {
    testDefaultSlot(PageHeader);
    testAttrPassingToRoot(PageHeader);
    testRootClass(PageHeader, "page-header");
});
