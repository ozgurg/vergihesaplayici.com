import { describe } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import ModalTitle from "@/components/common/modal/modal-title.vue";

describe("components/common/modal/modal-title.vue", () => {
    testDefaultSlot(ModalTitle);
    testAttrPassingToRoot(ModalTitle);
    testRootClass(ModalTitle, "modal-title");
});
