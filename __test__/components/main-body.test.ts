import { describe } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import MainBody from "@/components/main-body.vue";

describe("components/main-body.vue", () => {
    testDefaultSlot(MainBody);
    testAttrPassingToRoot(MainBody);
    testRootClass(MainBody, "main-body");
});
