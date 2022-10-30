<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <PageTitle>
            {{ page.title }}
        </PageTitle>

        <InnerContainer>
            <FormRow class="mb-5">
                <CalculatorPresets
                    :value="matchingPresetIds"
                    :presets="ui.presets"
                    @click="choosePreset($event)" />
            </FormRow>

            <FormRow
                class="mb-10"
                label="Konsol fiyatı">
                <v-text-field
                    v-model.number="form.price"
                    v-number=""
                    :prefix="selectedCurrency.sign"
                    hide-details=""
                    hide-spin-buttons=""
                    filled=""
                    outlined=""
                    min="1"
                    inputmode="decimal"
                    type="number"
                    aria-label="Konsol fiyatı">
                    <template #append-outer>
                        <CurrencySelector
                            v-model="form.currency"
                            style="width:96px" />
                    </template>
                </v-text-field>
            </FormRow>

            <CalculatorResultTabs
                v-model="ui.tab"
                :should-show-results="shouldShowResults">
                <template v-if="shouldShowResults">
                    <template v-if="form.currency === 'TRY'">
                        <ReverseCalculationAlert />
                    </template>
                    <template v-else>
                        <EstimatedCalculationAlert />
                    </template>

                    <CalculatorResultList
                        :items="resultList"
                        class="mb-5" />

                    <FormRow>
                        <MinimumWageAlert
                            :price="results.prices.taxAdded"
                            class="mb-10" />

                        <CalculatorShareButton
                            :screenshot-input="screenshotInput"
                            :screenshot-output="screenshotOutput"
                            :form="form"
                            :calculator-title="page.title"
                            :preset-title="matchingPresetTitles" />
                    </FormRow>
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
    </div>
</template>

<script>
import ConsoleTaxCalculator from "@/calculators/ConsoleTaxCalculator.js";
import { isCurrencyAvailable } from "@/utils/is-currency-available.js";
import {
    createCalculatorMatchingPresetIds,
    createCalculatorMatchingPresetTitles,
    findCalculatorMatchingPresets
} from "@/utils/find-calculator-matching-presets.js";
import { moneyFormat } from "@/utils/formatter.js";
import page from "@/data/pages/KonsolVergisiHesaplayici.js";

export default {
    head() {
        return page.head;
    },
    data: () => ({
        page,
        ui: {
            presets: [
                // PS5: https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
                // Nintendo Switch: https://en.wikipedia.org/wiki/Nintendo_Switch#cite_note-polygon_oled_announce-178
                { id: 1, title: "Xbox Series S (512GB)", form: { price: 299, currency: "EUR" } },
                { id: 2, title: "Xbox Series X (1TB)", form: { price: 499, currency: "EUR" } },
                { id: 3, title: "PlayStation 5 Digital Edition (825GB)", form: { price: 449.99, currency: "EUR" } },
                { id: 4, title: "PlayStation 5 (825GB)", form: { price: 549.99, currency: "EUR" } },
                { id: 5, title: "Nintendo Switch OLED (64GB)", form: { price: 349.99, currency: "USD" } }
            ],
            tab: 1
        },
        form: {
            currency: "USD",
            price: ""
        },
        results: {}
    }),
    methods: {
        choosePreset(preset) {
            const vm = this;
            Object.assign(vm.form, preset.form);
        },
        _calculate() {
            const vm = this;

            const calculator = new ConsoleTaxCalculator({
                price: vm.priceMultipliedExchangeRate
            }, {
                calculateFromTaxAddedPrice: vm.form.currency === "TRY"
            });

            vm.results = calculator.calculate();
        },
        _handleQuery() {
            const vm = this;

            const query = vm.$route.query;
            if (!query) return;

            if (query.price) {
                vm.form.price = parseFloat(query.price);
            }

            if (query.currency && isCurrencyAvailable(query.currency, vm.$store.getters["exchange-rates/availableCurrencies"])) {
                vm.form.currency = query.currency;
            }
        }
    },
    computed: {
        resultList() {
            const vm = this;
            return [
                {
                    key: "Vergisiz fiyat",
                    value: moneyFormat(vm.results.prices.taxFree, "TRY")
                },
                {
                    key: `Gümrük vergisi (%${vm.results.taxRates.customTax})`,
                    value: moneyFormat(vm.results.taxFees.customTax, "TRY")
                },
                {
                    key: `ÖTV (%${vm.results.taxRates.specialConsumptionTax})`,
                    value: moneyFormat(vm.results.taxFees.specialConsumptionTax, "TRY")
                },
                {
                    key: `KDV (%${vm.results.taxRates.valueAddedTax})`,
                    value: moneyFormat(vm.results.taxFees.valueAddedTax, "TRY")
                },
                {
                    key: `Toplam vergi (%${vm.results.taxRates.total})`,
                    value: moneyFormat(vm.results.taxFees.total, "TRY")
                },
                {
                    key: "Tahmini satış fiyatı",
                    value: moneyFormat(vm.results.prices.taxAdded, "TRY")
                }
            ];
        },
        screenshotInput() {
            const vm = this;
            return [
                {
                    key: "Konsol fiyatı",
                    value: moneyFormat(vm.form.price, vm.form.currency)
                }
            ];
        },
        screenshotOutput() {
            const vm = this;
            return vm.resultList;
        },
        shouldShowResults() {
            const vm = this;
            return vm.form.price > 0 && vm.form.currency !== "";
        },
        matchingPresets() {
            const vm = this;
            return findCalculatorMatchingPresets(vm.ui.presets, {
                price: vm.form.price,
                currency: vm.form.currency
            });
        },
        matchingPresetIds() {
            const vm = this;
            return createCalculatorMatchingPresetIds(vm.matchingPresets);
        },
        matchingPresetTitles() {
            const vm = this;
            return createCalculatorMatchingPresetTitles(vm.matchingPresets).join(" / ");
        },
        selectedCurrency() {
            const vm = this;
            return vm.$store.getters["exchange-rates/currencies"][vm.form.currency];
        },
        priceMultipliedExchangeRate() {
            const vm = this;
            return vm.form.price * vm.selectedCurrency.rate;
        }
    },
    watch: {
        shouldShowResults(current, previous) {
            const vm = this;

            if (!current && previous && vm.ui.tab === 0) {
                vm.ui.tab = 1;
            }
        },
        form: {
            deep: true,
            handler() {
                const vm = this;

                if (!vm.shouldShowResults) return;

                vm._calculate();

                // Show results tab when calculated
                vm.ui.tab = 0;

                vm.$router.push({ query: vm.form });
            }
        }
    },
    mounted() {
        const vm = this;
        vm.$nextTick(() => vm._handleQuery());
    }
};
</script>
