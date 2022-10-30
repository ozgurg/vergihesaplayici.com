<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <PageTitle>
            {{ page.title }}
        </PageTitle>

        <InnerContainer>
            <FormRow class="mb-5">
                <CalculatorPresets :presets="ui.presets" />
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
                            :preset-title="[]" />
                    </FormRow>
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
    </div>
</template>

<script>
import ConsoleTaxCalculator from "@/calculators/ConsoleTaxCalculator.js";
import { isCurrencyAvailable } from "@/utils/is-currency-available.js";
import { moneyFormat } from "@/utils/formatter.js";
import { KonsolVergisiHesaplayici, presets } from "@/data/pages/KonsolVergisiHesaplayici.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page: KonsolVergisiHesaplayici,
        ui: {
            presets,
            tab: 1
        },
        form: {
            currency: "USD",
            price: ""
        },
        results: {}
    }),
    methods: {
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
