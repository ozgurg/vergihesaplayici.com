<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <PageTitle>
            {{ page.title }}
        </PageTitle>

        <InnerContainer>
            <FormRow
                class="mb-10"
                label="Kapasite">
                <RadioGrid
                    v-model="form.option"
                    :items="ui.options"
                    cols="4"
                    lg="3" />
            </FormRow>

            <FormRow
                class="mb-10"
                label="Kayıt yolu">
                <RadioGrid
                    v-model="form.registration"
                    :items="ui.registration"
                    cols="6"
                    md="5"
                    lg="4" />
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
                            :calculator-title="page.title" />
                    </FormRow>
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
    </div>
</template>

<script>
import presetPage from "./page.js";
import { registrationOptions } from "./../page.js";
import { buildResultList, buildScreenshotInput, shouldShowResults } from "./../utils";
import Calculator, { Registration } from "./../Calculator.js";
import { moneyFormat } from "@/utils/formatter.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page: null,
        ui: {},
        form: {},
        results: {}
    }),
    methods: {
        _calculate() {
            const vm = this;

            const calculator = new Calculator({
                price: vm.priceMultipliedExchangeRate,
                registration: vm.form.registration,
                eurToTryCurrency: vm.$store.getters["exchange-rates/currencies"].EUR.rate
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
            return buildResultList(vm.results, vm.form.registration);
        },
        screenshotInput() {
            const vm = this;
            return buildScreenshotInput({
                price: vm.form.price,
                currency: vm.form.currency,
                registrationTitle: vm.ui.registration.find(item => item.value === vm.form.registration).title
            });
        },
        screenshotOutput() {
            const vm = this;
            return vm.resultList;
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
        // For correct calculation, we need to fetch the USD exchange rate.
        // The result will be calculated during the build process and the calculation will be incorrect if the exchange rate changes.
        // In the front-end, the exchange rate will be re-fetched and the calculation will be correct.
        await store.dispatch("exchange-rates/loadExchangeRateFromApi", "USD");

        const page = presetPage(slug);
        if (!page) {
            return error({ statusCode: 404 });
        }

        const options = page.preset.options.map(option => {
            return {
                title: option.title,
                value: option.form,
                description: moneyFormat(option.form.price, option.form.currency)
            };
        });

        const form = {
            option: page.preset.options[0].form,
            currency: "USD",
            price: "",
            registration: Registration.Import,
            ...page.preset.options[0].form
        };

        return {
            page,
            ui: {
                options,
                registration: registrationOptions,
                tab: 0
            },
            form
        };
    }
};
</script>
