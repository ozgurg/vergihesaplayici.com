<template>
    <div>
        <AppBreadcrumbs :items="breadcrumbItems" />

        <PageTitle>{{ head.title }}</PageTitle>

        <InnerContainer>
            <FormRow class="mb-10" label="Hesaplama modu">
                <v-radio-group
                    v-model="form.mode"
                    hide-details=""
                    class="pa-0 ma-0">
                    <v-radio
                        v-for="item in ui.mode"
                        :key="item.value"
                        :label="item.title"
                        :value="item.value" />
                </v-radio-group>
            </FormRow>

            <FormRow
                class="mb-10"
                :label="priceLabel">
                <v-text-field
                    v-model.number="form.price"
                    :aria-label="priceLabel"
                    hide-details=""
                    filled=""
                    outlined=""
                    step="any"
                    min="1"
                    inputmode="decimal"
                    type="number" />
            </FormRow>

            <FormRow
                label="KDV oranı">
                <v-text-field
                    v-model.number="form.rate"
                    prefix="%"
                    hide-details=""
                    filled=""
                    outlined=""
                    step="1"
                    min="1"
                    inputmode="decimal"
                    type="number"
                    aria-label="KDV oranı" />
            </FormRow>

            <FormRow class="mt-4">
                <CalculatorPresets
                    :value="matchingPresetIds"
                    :presets="ui.presets"
                    @click="choosePreset($event)" />
            </FormRow>

            <CalculatorResultTabs
                v-model="ui.tab"
                :should-show-results="shouldShowResults"
                class="mt-10">
                <template v-if="shouldShowResults">
                    <CalculatorResultFormRow
                        v-for="(item, index) in resultList"
                        :key="index"
                        :value="item.value"
                        :label="item.key"
                        class="mb-5" />

                    <FormRow>
                        <div>
                            <v-btn
                                outlined=""
                                color="primary"
                                large=""
                                @click="ui.isShareDialogShown = true">
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
                            :calculator-title="head.title" />
                    </FormRow>
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
    </div>
</template>

<script>
import { mdiShare } from "@mdi/js";
import { VatCalculator as calculator } from "@/data/calculators.js";
import VatCalculator, { Mode } from "@/calculators/VatCalculator.js";
import { createCalculatorMatchingPresetIds } from "@/utils/find-calculator-matching-presets.js";
import { numberFormat } from "@/utils/formatter.js";
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
            ogImageName: "kdv-hesaplayici.jpg"
        }),
        ui: {
            tab: 1,
            isShareDialogShown: false,
            presets: [
                {
                    id: 1,
                    title: "Yüzde 1",
                    form: { rate: 1 }
                },
                {
                    id: 2,
                    title: "Yüzde 8",
                    form: { rate: 8 }
                },
                {
                    id: 3,
                    title: "Yüzde 18",
                    form: { rate: 18 }
                }
            ],
            mode: [
                {
                    title: "KDV hariç fiyattan KDV dahil fiyatı hesapla",
                    value: Mode.TaxFreePriceToTaxAddedPrice
                },
                {
                    title: "KDV dahil fiyattan KDV hariç fiyatı hesapla",
                    value: Mode.TaxAddedPriceToTaxFreePrice
                }
            ]
        },
        form: {
            price: null,
            rate: 18,
            mode: Mode.TaxFreePriceToTaxAddedPrice
        },
        results: {}
    }),
    methods: {
        calculate() {
            const vm = this;

            const calculator = new VatCalculator({
                price: vm.form.price,
                rate: vm.form.rate,
                mode: vm.form.mode
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

            if (query.mode && vm.ui.mode.some(object => object.value === query.mode)) {
                vm.form.mode = query.mode;
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
                    key: "KDV hariç fiyat",
                    value: numberFormat(vm.results.prices.taxFree)
                },
                {
                    key: `KDV (%${vm.results.taxRates.valueAddedTax})`,
                    value: numberFormat(vm.results.taxFees.valueAddedTax)
                },
                {
                    key: "KDV dahil fiyat",
                    value: numberFormat(vm.results.prices.taxAdded)
                }
            ];
        },
        screenshotData() {
            const vm = this;

            return {
                output: vm.resultList,
                input: []
            };
        },
        shouldShowResults() {
            const vm = this;
            return vm.form.price > 0;
        },
        matchingPresets() {
            const vm = this;
            return vm.ui.presets.filter(preset => preset.form.rate === vm.form.rate);
        },
        matchingPresetIds() {
            const vm = this;
            return createCalculatorMatchingPresetIds(vm.matchingPresets);
        },
        priceLabel() {
            const vm = this;
            return {
                [Mode.TaxFreePriceToTaxAddedPrice]: "KDV hariç fiyat",
                [Mode.TaxAddedPriceToTaxFreePrice]: "KDV dahil fiyat"
            }[vm.form.mode];
        },
        breadcrumbItems() {
            return [
                {
                    title: "Hesaplayıcılar",
                    url: "/hesaplayicilar/"
                },
                {
                    title: calculator.title,
                    url: calculator.url
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
