import { describe } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import ModalHeader from "@/components/common/modal/modal-header.vue";

describe("components/common/modal/modal-header.vue", () => {
    testDefaultSlot(ModalHeader);
    testAttrPassingToRoot(ModalHeader);
    testRootClass(ModalHeader, "modal-header");
});
