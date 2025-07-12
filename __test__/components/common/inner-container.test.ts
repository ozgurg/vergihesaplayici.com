import { describe } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import InnerContainer from "@/components/common/inner-container.vue";

describe("components/common/inner-container.vue", () => {
    testDefaultSlot(InnerContainer);
    testAttrPassingToRoot(InnerContainer);
    testRootClass(InnerContainer, "inner-container");
});
