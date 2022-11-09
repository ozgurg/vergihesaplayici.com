<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <PageTitle>
            {{ page.title }}
        </PageTitle>

        <InnerContainer>
            <FormRow
                class="mb-10"
                label="Hesaplama modu">
                <RadioGrid
                    v-model="form.mode"
                    :items="ui.mode"
                    cols="6"
                    md="6"
                    lg="5" />
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
                            :screenshot-output="resultList"
                            :form="form"
                            :calculator-title="page.title" />
                    </FormRow>
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
    </div>
</template>

<script>
import Calculator, { Mode } from "@/data/pages/kdv-hesaplayici/kdv-hesaplayici.calculator.js";
import page, { modeOptions } from "@/data/pages/kdv-hesaplayici/kdv-hesaplayici.page.js";
import { numberFormat } from "@/utils/formatter.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page,
        ui: {
            tab: 1,
            mode: modeOptions
        },
        form: {
            price: "",
            rate: 18,
            mode: Mode.TaxFreePriceToTaxAddedPrice
        },
        results: {}
    }),
    methods: {
        _calculate() {
            const vm = this;

            const calculator = new Calculator({
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
        shouldShowResults() {
            const vm = this;
            return vm.form.price > 0;
        },
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
