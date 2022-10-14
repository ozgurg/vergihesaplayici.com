<template>
    <div>
        <AppBreadcrumbs :items="breadcrumbItems" />

        <PageTitle>{{ head.title }}</PageTitle>

        <InnerContainer>
            <FormRow class="mb-4">
                <CalculatorPresets
                    @click="choosePreset($event)"
                    :value="matchingPresetIds"
                    :presets="ui.presets">
                    <template #tooltip="{preset}">
                        {{ moneyFormat(preset.form.price, preset.form.currency) }}
                    </template>
                </CalculatorPresets>
            </FormRow>

            <FormRow label="Konsol fiyatı">
                <v-text-field
                    v-model.number="form.price"
                    :prefix="selectedCurrency.sign"
                    hide-details=""
                    filled=""
                    outlined=""
                    step="any"
                    min="1"
                    inputmode="decimal"
                    type="number"
                    aria-label="Konsol fiyatı">
                    <template #append-outer>
                        <CurrencySelector
                            v-model="form.currency"
                            style="width:110px" />
                    </template>
                </v-text-field>
            </FormRow>

            <CalculatorResultTabs
                v-model="ui.tab"
                :show-results="shouldShowResults"
                class="mt-10">
                <template v-if="shouldShowResults">
                    <ReverseCalculationAlert v-if="form.currency === 'TRY'" />
                    <EstimatedCalculationAlert v-else />

                    <CalculatorResultFormRow
                        v-for="(item, index) in resultList"
                        :key="index"
                        :value="item.value"
                        :label="item.key"
                        class="mb-5" />

                    <FormRow class="mb-6">
                        <MinimumWageAlert :price="results.prices.taxAdded" />
                    </FormRow>

                    <FormRow>
                        <div>
                            <v-btn
                                @click="ui.isShareDialogShown = true"
                                outlined=""
                                color="primary"
                                large="">
                                <v-icon left="">
                                    {{ icons.mdiShare }}
                                </v-icon>
                                Paylaş...
                            </v-btn>
                        </div>

                        <CalculatorShareDialog
                            v-model="ui.isShareDialogShown"
                            :screenshot-data="screenshotData"
                            :form-data="form"
                            :title="head.title"
                            :matching-presets="matchingPresets" />
                    </FormRow>
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
    </div>
</template>

<script>
import { mdiShare } from "@mdi/js";
import ConsoleTaxCalculator from "@/calculators/ConsoleTaxCalculator.js";
import { ConsoleTaxCalculator as calculator } from "@/data/calculators.js";
import { isCurrencyAvailable } from "@/utils/is-currency-available.js";
import {
    createCalculatorMatchingPresetIds,
    findCalculatorMatchingPresets
} from "@/utils/find-calculator-matching-presets.js";
import { moneyFormat } from "@/utils/formatter.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";

export default {
    head() {
        return this.head;
    },
    data: () => ({
        icons: {
            mdiShare
        },
        head: buildHeadTags({
            title: calculator.title,
            description: calculator.description,
            ogImageName: "konsol-vergisi-hesaplayici.jpg"
        }),
        ui: {
            presets: calculator.presets,
            tab: 1,
            isShareDialogShown: false
        },
        form: {
            currency: "USD",
            price: ""
        },
        results: {}
    }),
    methods: {
        moneyFormat,
        calculate() {
            const vm = this;

            const calculator = new ConsoleTaxCalculator({
                price: vm.priceMultipliedExchangeRate
            }, {
                calculateFromTaxAddedPrice: vm.form.currency === "TRY"
            });

            vm.results = calculator.calculate();
        },
        handleQuery() {
            const vm = this;

            const query = vm.$route.query;
            if (!query) return;

            if (query.price) {
                vm.form.price = parseFloat(query.price);
            }

            if (query.currency && isCurrencyAvailable(query.currency, vm.$store.getters["exchange-rates/availableCurrencies"])) {
                vm.form.currency = query.currency;
            }
        },
        choosePreset(preset) {
            const vm = this;
            Object.assign(vm.form, preset.form);
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
        screenshotData() {
            const vm = this;

            return {
                output: vm.resultList,
                input: [
                    {
                        key: "Konsol fiyatı",
                        value: moneyFormat(vm.form.price, vm.form.currency)
                    }
                ]
            };
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
        selectedCurrency() {
            const vm = this;
            return vm.$store.getters["exchange-rates/currencies"][vm.form.currency];
        },
        priceMultipliedExchangeRate() {
            const vm = this;
            return vm.form.price * vm.selectedCurrency.rate;
        },
        breadcrumbItems() {
            return [
                {
                    title: "Hesaplayıcılar",
                    to: "/hesaplayicilar/"
                },
                {
                    title: calculator.title,
                    to: calculator.url
                }
            ];
        }
    },
    watch: {
        form: {
            deep: true,
            handler() {
                const vm = this;

                if (!vm.shouldShowResults) return;

                vm.calculate();

                // Show results tab when calculated
                vm.ui.tab = 0;

                vm.$router.push({ query: vm.form });
            }
        },
        "form.price"() {
            const vm = this;

            if (vm.form.price >= 999999) {
                vm.$nextTick(() => {
                    vm.form.price = 999999;
                });
            }
        }
    },
    mounted() {
        const vm = this;

        vm.$nextTick(() => {
            setTimeout(() => vm.handleQuery(), 100);
        });
    }
};
</script>
