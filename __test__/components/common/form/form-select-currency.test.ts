import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import FormSelect from "@/components/common/form/form-select.vue";
import FormSelectCurrency from "@/components/common/form/form-select-currency.vue";

describe("components/common/form/form-select-currency.vue", () => {
    const EXCHANGE_RATES = {
        dateUpdated: new Date(),
        rates: {
            TRY: 1,
            USD: 1,
            EUR: 1
        }
    };

    const CURRENCY_CODES = Object.keys(EXCHANGE_RATES.rates);

    it("renders correct `<option />`s based on `EXCHANGE_RATES`", () => {
        const wrapper = mount(FormSelectCurrency, {
            props: { EXCHANGE_RATES }
        });

        for (const _currencyCode of CURRENCY_CODES) {
            const option = wrapper.find(`option[value="${_currencyCode}"]`);
            expect(option.exists()).toBeTruthy();
            expect(option.text()).toBe(_currencyCode);
        }
    });

    it("binds `v-model` correctly", async () => {
        let testModelValue: any;
        const wrapper = mount(FormSelectCurrency, {
            props: {
                EXCHANGE_RATES,
                modelValue: testModelValue,
                "onUpdate:modelValue": (value: any) => {
                    testModelValue = value;
                }
            }
        });

        const select = wrapper.findComponent(FormSelect);
        await select.setValue("USD");
        expect(testModelValue).toBe("USD");
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["USD"]);
    });
});
