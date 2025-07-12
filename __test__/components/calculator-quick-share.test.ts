import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import FormButton from "@/components/common/form/form-button.vue";
import CalculatorQuickShare from "@/components/calculator-quick-share.vue";

const TEST_URL = new URL("https://vergihesaplayici.com");

describe("components/calculator-quick-share.vue", () => {
    it("renders share buttons with correct attrs", () => {
        const wrapper = mount(CalculatorQuickShare, {
            props: {
                url: TEST_URL
            }
        });

        const shareButtons = wrapper.findAllComponents(FormButton);
        for (const _formButton of shareButtons.values()) {
            // `Diğer…` is a `<form-button />` too, so we manually skip it
            if (_formButton.attributes("href")) {
                expect(_formButton.attributes("href")).toBeTruthy();
                expect(_formButton.attributes("aria-label")).toBeTruthy();
                expect(_formButton.attributes("rel")).toBe("nofollow noopener noreferrer");
                expect(_formButton.attributes("target")).toBe("_blank");
            }
        }
    });

    it("emits `click:other` on `Diğer…` click", async () => {
        const wrapper = mount(CalculatorQuickShare, {
            props: {
                url: TEST_URL
            },
            global: {
                config: {
                    globalProperties: {
                        $emit: vi.fn()
                    }
                }
            }
        });

        await wrapper.find("[aria-label=\"Diğer paylaşım seçeneklerini aç\"]").trigger("click");

        expect(wrapper.emitted("click:other")).toBeTruthy();
    });

    it("generates random `id` and `aria-labelledby` attrs", () => {
        const wrapper = mount(CalculatorQuickShare, {
            props: {
                url: TEST_URL
            }
        });
        expect(wrapper.attributes("aria-labelledby")).toBe(wrapper.find("span").attributes("id"));
    });
});
