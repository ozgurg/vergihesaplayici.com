<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <PageTitle>
            {{ page.title }}
        </PageTitle>

        <InnerContainer>
            <FormRow
                class="mb-10"
                label="Model">
                <RadioGrid
                    v-model="form.option"
                    :items="ui.options"
                    cols="4"
                    lg="3" />
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
                            :calculator-title="page.calculatorTitle"
                            :preset-title="page.preset.title" />
                    </FormRow>
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
    </div>
</template>

<script>
import page from "@/data/pages/konsol-vergisi-hesaplayici/konsol-vergisi-hesaplayici-slug.page.js";
import { moneyFormat } from "@/utils/formatter.js";
import {
    buildResultList,
    buildScreenshotInput,
    shouldShowResults
} from "@/data/pages/konsol-vergisi-hesaplayici/konsol-vergisi-hesaplayici.utils.js";
import Calculator from "@/data/pages/konsol-vergisi-hesaplayici/konsol-vergisi-hesaplayici.calculator.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page: null,
        preset: null,
        ui: {},
        form: {},
        results: {}
    }),
    methods: {
        _calculate() {
            const vm = this;

            const calculator = new Calculator({
                price: vm.form.price * vm.selectedCurrency.rate
            }, {
                calculateFromTaxAddedPrice: vm.form.currency === "TRY"
            });

            vm.results = calculator.calculate();
        }
    },
    computed: {
        shouldShowResults() {
            const vm = this;
            return shouldShowResults(vm.form);
        },
        resultList() {
            const vm = this;
            return buildResultList(vm.results);
        },
        screenshotInput() {
            const vm = this;
            return buildScreenshotInput({
                price: vm.form.price,
                currency: vm.form.currency
            });
        },
        screenshotOutput() {
            const vm = this;
            return vm.resultList;
        },
        selectedCurrency() {
            const vm = this;
            return vm.$store.getters["exchange-rates/currencies"][vm.form.currency];
        }
    },
    watch: {
        form: {
            deep: true,
            immediate: true,
            handler() {
                const vm = this;
                vm._calculate();
            }
        },
        "form.option"() {
            const vm = this;
            Object.assign(vm.form, vm.form.option);
        }
    },
    async asyncData({ store, error, params: { slug } }) {
        const presetPage = page(slug);
        if (!presetPage) {
            return error({ statusCode: 404 });
        }

        // For correct calculation, we need to fetch the exchange rate of the preset.
        // The result will be calculated during the build process and the calculation will be incorrect if the exchange rate changes.
        // In the front-end, the exchange rate will be re-fetched and the calculation will be correct.
        await store.dispatch("exchange-rates/loadExchangeRateFromApi", presetPage.preset.options[0].form.currency);

        const options = presetPage.preset.options.map(option => ({
            title: option.title,
            value: option.form,
            description: moneyFormat(option.form.price, option.form.currency)
        }));

        const form = {
            option: presetPage.preset.options[0].form,
            currency: "USD",
            price: "",
            ...presetPage.preset.options[0].form
        };

        return {
            page: presetPage,
            ui: {
                options,
                tab: 0
            },
            form
        };
    }
};
</script>
