import { describe } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import RichText from "@/components/common/rich-text.vue";

describe("components/common/rich-text.vue", () => {
    testDefaultSlot(RichText);
    testAttrPassingToRoot(RichText);
    testRootClass(RichText, "rich-text");
});
