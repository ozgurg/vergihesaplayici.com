import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { testRootClass } from "@root/__test__/utils.js";
import AppFooter from "@/components/app/app-footer.vue";

describe("components/app/app-footer.vue", () => {
    testRootClass(AppFooter, "app-footer", {
        props: {
            EXCHANGE_RATES: { rates: {}, dateUpdated: new Date() }
        }
    });

    it("renders exchange rates correctly", () => {
        const primaryCurrencyCode = "TRY";
        const testRates = { [primaryCurrencyCode]: 1, USD: 38, EUR: 44 };
        const wrapper = mount(AppFooter, {
            props: {
                EXCHANGE_RATES: {
                    rates: testRates,
                    dateUpdated: new Date()
                }
            }
        });

        const listItems = wrapper.findAll(".exchange-rates-list li");

        expect(listItems).toHaveLength(Object.keys(testRates).length - 1);

        let index = 0;
        for (const [_currencyCode, _rate] of Object.entries(testRates)) {
            if (_currencyCode !== primaryCurrencyCode) {
                const listItem = listItems[index]!;
                expect(listItem.find("small").text()).toBe(_currencyCode);
                expect(listItem.find("b").text()).toBe(formatMoney(_rate, primaryCurrencyCode));

                index++;
            }
        }
    });

    it("renders update date correctly", () => {
        const textDateUpdated = new Date("2025-01-01T10:00:00Z");
        const wrapper = mount(AppFooter, {
            props: {
                // @ts-expect-error: Value of `rates` is not important for this test
                EXCHANGE_RATES: { rates: {}, dateUpdated: textDateUpdated }
            }
        });

        const time = wrapper.find("time");
        expect(time.exists()).toBeTruthy();
        expect(time.attributes("datetime")).toBe(textDateUpdated.toISOString());
        expect(time.text()).toBe(textDateUpdated.toLocaleString("tr-TR"));
    });

    it("renders API provider credit link correctly", () => {
        const wrapper = mount(AppFooter, {
            props: {
                // @ts-expect-error: Value of `rates` is not important for this test
                EXCHANGE_RATES: { rates: {}, dateUpdated: new Date() }
            }
        });

        const creditLink = wrapper.find(".exchange-rates-info a");
        expect(creditLink.exists()).toBeTruthy();
        expect(creditLink.attributes("href")).toBeDefined();
        expect(creditLink.text()).toBeDefined();
    });
});
