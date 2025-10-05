import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { describe, expect, it } from "vitest";
import Modal from "@/components/common/modal/modal.vue";
import ModalCloseButton from "@/components/common/modal/modal-close-button.vue";
import CalculatorPieChart from "@/components/calculator-pie-chart.vue";

const TEST_ITEMS = [
    { label: "ÖTV", value: 600 },
    { label: "KDV", value: 400 },
    { label: "Diğer", value: 1 } // Very small to exercise min-angle logic
];

const mountComponent = () => mount(CalculatorPieChart, {
    props: {
        title: "Vergi dağılımı",
        items: TEST_ITEMS
    },
    global: {
        stubs: {
            modal: {
                props: ["modelValue"],
                template: `
                    <div class="modal">
                        <slot />
                    </div>`
            },
            "modal-header": { template: `<div class="modal-header"><slot /></div>` },
            "modal-title": { template: `<div class="modal-title"><slot /></div>` },
            "modal-close-button": { template: `<button class="modal-close-button" />` },
            "modal-body": { template: `<div class="modal-body"><slot /></div>` }
        }
    }
});

describe("components/calculator-pie-chart.vue", () => {
    it("renders `<svg />` with correct `aria-label` and `<path />s` for each item", () => {
        const wrapper = mountComponent();

        const svg = wrapper.find("svg");
        expect(svg.exists()).toBeTruthy();
        expect(svg.attributes("aria-label")).toBe("Vergi dağılımı");

        const paths = svg.findAll("path");
        expect(paths).toHaveLength(TEST_ITEMS.length);

        for (const [_index, _path] of paths.entries()) {
            expect(_path.attributes("role")).toBe("button");
            expect(_path.attributes("tabindex")).toBe("0");
            expect(_path.attributes("data-index")).toBe(String(_index));
        }
    });

    it("renders legend items with labels and percentages", () => {
        const wrapper = mountComponent();

        const legendItems = wrapper.findAll(".legend__item");
        expect(legendItems).toHaveLength(TEST_ITEMS.length);

        const totalPercentage = TEST_ITEMS.reduce((s, i) => s + i.value, 0);
        for (const [_index, _legendItem] of legendItems.entries()) {
            const percentage = Number((TEST_ITEMS[_index]!.value / totalPercentage * 100).toFixed(2));
            expect(_legendItem.text()).toContain(TEST_ITEMS[_index]!.label);
            expect(_legendItem.text()).toContain(`(${percentage}%)`);
            expect(_legendItem.attributes("data-index")).toBe(String(_index));
        }
    });

    it("sets accessible `aria-label`s on each `<path />` with label and percentage", () => {
        const wrapper = mountComponent();

        const svgPaths = wrapper.findAll("svg > path");

        const totalPercentage = TEST_ITEMS.reduce((s, i) => s + i.value, 0);
        for (const [_index, _path] of svgPaths.entries()) {
            const percentage = Number((TEST_ITEMS[_index]!.value / totalPercentage * 100).toFixed(2));
            const ariaLabel = _path.attributes("aria-label");
            expect(ariaLabel).toContain(TEST_ITEMS[_index]!.label);
            expect(ariaLabel).toContain(`${percentage}%)`);
        }
    });

    it("sets tooltip visible on hover and hides on `mouseleave`", async () => {
        const wrapper = mountComponent();

        const firstPath = wrapper.find("svg > path");

        await firstPath.trigger("mouseenter", { clientX: 10, clientY: 10 });
        const tooltip = wrapper.find(".tooltip");
        expect(tooltip.exists()).toBeTruthy();
        expect(tooltip.attributes("aria-hidden")).toBe("false");

        await firstPath.trigger("mouseleave");
        const tooltipAfter = wrapper.find(".tooltip");
        expect(tooltipAfter.attributes("aria-hidden")).toBe("true");
    });

    it("updates tooltip position on `mousemove` while visible", async () => {
        const wrapper = mountComponent();

        const firstPath = wrapper.find("svg > path");

        await firstPath.trigger("mouseenter", { clientX: 12, clientY: 34 });
        let tooltip = wrapper.find(".tooltip");
        expect(tooltip.attributes("aria-hidden")).toBe("false");
        expect(tooltip.attributes("style")).toContain("--x: 12px");
        expect(tooltip.attributes("style")).toContain("--y: 34px");

        await firstPath.trigger("mousemove", { clientX: 56, clientY: 78 });
        tooltip = wrapper.find(".tooltip");
        expect(tooltip.attributes("style")).toContain("--x: 56px");
        expect(tooltip.attributes("style")).toContain("--y: 78px");
    });

    it("opens `<modal />` on click and shows selected item details", async () => {
        const wrapper = mountComponent();

        const secondPath = wrapper.findAll("svg > path")[1];

        await secondPath!.trigger("click");

        const modal = wrapper.findComponent(Modal);
        expect(modal.exists()).toBeTruthy();
        expect(modal.text()).toContain(TEST_ITEMS[1]!.label);
    });

    it("opens `<modal />` on keyboard interaction (Enter or Space)", async () => {
        const wrapper = mountComponent();

        const svgPath = wrapper.find("svg > path");

        await svgPath.trigger("keydown", { key: "Enter" });

        let modal = wrapper.findComponent(Modal);
        if (!modal.exists()) {
            await svgPath.trigger("keydown", { key: " ", code: "Space" });
            modal = wrapper.findComponent(Modal);
        }
        expect(modal.exists()).toBeTruthy();
    });

    it("closes `<modal />` when close button is clicked", async () => {
        const wrapper = mountComponent();

        const firstPath = wrapper.find("svg > path");
        await firstPath.trigger("click");

        let modal = wrapper.findComponent(Modal);
        expect(modal.exists()).toBeTruthy();

        expect(modal.props("modelValue")).toBe(true);

        const closeButton = wrapper.findComponent(ModalCloseButton);
        await closeButton.trigger("click");
        await nextTick();

        modal = wrapper.findComponent(Modal);
        expect(modal.props("modelValue")).toBe(false);
    });

    it("syncs `v-model` when `<modal />` emits `update:modelValue`", async () => {
        const wrapper = mountComponent();

        const firstPath = wrapper.find("svg > path");
        await firstPath.trigger("click");

        let modal = wrapper.findComponent(Modal);
        expect(modal.exists()).toBeTruthy();
        expect(modal.props("modelValue")).toBe(true);

        modal.vm.$emit("update:modelValue", false);
        await nextTick();

        modal = wrapper.findComponent(Modal);
        expect(modal.props("modelValue")).toBe(false);
    });
});
