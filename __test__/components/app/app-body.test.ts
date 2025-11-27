import { describe } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import AppBody from "@/components/app/app-body.vue";

describe("components/app/app-body.vue", () => {
    testDefaultSlot(AppBody);
    testAttrPassingToRoot(AppBody);
    testRootClass(AppBody, "app-body");
});
