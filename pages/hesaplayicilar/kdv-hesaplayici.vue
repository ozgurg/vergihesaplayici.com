<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <PageTitle>
            {{ page.title }}
        </PageTitle>

        <InnerContainer>
            <FormRow class="mb-10" label="Hesaplama modu">
                <v-radio-group
                    v-model="form.mode"
                    hide-details=""
                    class="pa-0 ma-0">
                    <v-radio
                        v-for="_item in ui.mode"
                        :key="_item.value"
                        :label="_item.title"
                        :value="_item.value" />
                </v-radio-group>
            </FormRow>

            <FormRow
                class="mb-10"
                :label="priceLabel">
                <v-text-field
                    v-model.number="form.price"
                    v-number=""
                    :aria-label="priceLabel"
                    hide-details=""
                    hide-spin-buttons=""
                    filled=""
                    outlined=""
                    min="1"
                    inputmode="decimal"
                    type="number" />
            </FormRow>

            <FormRow
                class="mb-10"
                label="KDV oranı">
                <v-text-field
                    v-model.number="form.rate"
                    v-number=""
                    prefix="%"
                    hide-details=""
                    hide-spin-buttons=""
                    filled=""
                    outlined=""
                    min="1"
                    inputmode="decimal"
                    type="number"
                    aria-label="KDV oranı" />
            </FormRow>

            <CalculatorResultTabs
                v-model="ui.tab"
                :should-show-results="shouldShowResults">
                <template v-if="shouldShowResults">
                    <CalculatorResultList
                        :items="resultList"
                        class="mb-10" />

                    <FormRow>
                        <CalculatorShareButton
                            :screenshot-output="screenshotOutput"
                            :form="form"
                            :calculator-title="page.title" />
                    </FormRow>
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
    </div>
</template>

<script>
import VatCalculator, { Mode } from "@/calculators/VatCalculator.js";
import { numberFormat } from "@/utils/formatter.js";
import { KdvHesaplayici, modeOptions } from "@/data/pages/KdvHesaplayici.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page: KdvHesaplayici,
        ui: {
            tab: 1,
            mode: modeOptions
        },
        form: {
            price: null,
            rate: 18,
            mode: Mode.TaxFreePriceToTaxAddedPrice
        },
        results: {}
    }),
    methods: {
        _calculate() {
            const vm = this;

            const calculator = new VatCalculator({
                price: vm.form.price,
                rate: vm.form.rate,
                mode: vm.form.mode
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

            if (query.mode && vm.ui.mode.some(object => object.value === query.mode)) {
                vm.form.mode = query.mode;
            }
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
        screenshotOutput() {
            const vm = this;
            return vm.resultList;
        },
        shouldShowResults() {
            const vm = this;
            return vm.form.price > 0;
        },
        priceLabel() {
            const vm = this;
            return {
                [Mode.TaxFreePriceToTaxAddedPrice]: "KDV hariç fiyat",
                [Mode.TaxAddedPriceToTaxFreePrice]: "KDV dahil fiyat"
            }[vm.form.mode];
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
