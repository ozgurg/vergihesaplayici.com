import { describe } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import Container from "@/components/common/container.vue";

describe("components/common/container.vue", () => {
    testDefaultSlot(Container);
    testAttrPassingToRoot(Container);
    testRootClass(Container, "container");
});
