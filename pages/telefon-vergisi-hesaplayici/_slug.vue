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
                    :items="ui.options" />
            </FormRow>

            <FormRow
                class="mb-10"
                label="Kayıt yolu">
                <RadioGrid
                    v-model="form.registration"
                    :items="ui.registration"
                    style="--vh-radio-grid-optimal-width:224px" />
            </FormRow>

            <CalculatorResultTabs
                v-model="ui.tab"
                :should-show-results="shouldShowResults">
                <template v-if="shouldShowResults">
                    <EstimatedCalculationAlert />

                    <CalculatorResultList
                        :items="resultList"
                        class="mb-4" />

                    <FormRow class="mb-10">
                        <MinimumWageAlert :price="results.prices.taxAdded" />
                    </FormRow>

                    <div
                        v-if="form.option.retailPrice"
                        class="mb-10">
                        <CalculatorResultFormRow
                            :value="moneyFormat(form.option.retailPrice.value, 'TRY')"
                            class="mb-2"
                            label="Piyasa fiyatı" />

                        <FormRow>
                            <RetailPriceUpdateInfo
                                :last-updated-date="form.option.retailPrice.lastUpdatedDate"
                                :source-url="form.option.retailPrice.sourceUrl" />
                        </FormRow>
                    </div>

                    <FormRow>
                        <CalculatorShareButton
                            :screenshot-input="screenshotInput"
                            :screenshot-output="resultList"
                            :form="form"
                            :calculator-title="page.calculatorTitle"
                            :preset-title="page.preset.title"
                            :preset-option-title="form.option.title" />
                    </FormRow>

                    <v-divider class="my-12" />

                    <PageSubtitle class="mb-4">
                        Diğer telefonlar
                    </PageSubtitle>

                    <CalculatorPresets :presets="ui.presets" />
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
    </div>
</template>

<script>
import page, { presets } from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici-slug.page.js";
import { registrationOptions } from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.page.js";
import {
    buildResultList,
    buildScreenshotInput,
    shouldShowResults
} from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.utils.js";
import Calculator from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.calculator.js";
import { moneyFormat } from "@/utils/formatter.js";

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
        moneyFormat,
        _calculate() {
            const vm = this;

            const calculator = new Calculator({
                price: vm.form.price * vm.selectedCurrency.rate,
                registration: vm.form.registration,
                eurToTryCurrency: vm.$store.getters["exchange-rates/currencies"].EUR.rate
            }, {
                calculateFromTaxAddedPrice: vm.form.currency === "TRY"
            });

            vm.results = calculator.calculate();
        }
    },
    computed: {
        selectedCurrency() {
            const vm = this;
            return vm.$store.getters["exchange-rates/currencies"][vm.form.currency];
        },
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
            Object.assign(vm.form, vm.form.option.form);
        }
    },
    async asyncData({
        store,
        error,
        params: { slug }
    }) {
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
            value: option,
            price: moneyFormat(option.form.price, option.form.currency)
        }));

        const form = {
            option: presetPage.preset.options[0],
            currency: "USD",
            price: "",
            registration: registrationOptions[0].value,
            ...presetPage.preset.options[0].form
        };

        const otherPresets = presets.filter(preset => preset.slug !== slug);

        return {
            page: presetPage,
            ui: {
                options,
                registration: registrationOptions,
                presets: otherPresets,
                tab: 0
            },
            form
        };
    }
};
</script>
