<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <Heading1>
            {{ page.title }}
        </Heading1>

        <div class="mb-12">
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner728x90 :order="0" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner300x250 :order="0" />
            </template>
        </div>

        <CalculatorInnerContainer>
            <FormRow
                class="mb-10"
                label="Model">
                <RadioGrid
                    v-model="form.option"
                    :items="ui.options" />
            </FormRow>

            <template v-if="shouldShowResults">
                <FormRow>
                    <EstimatedCalculationAlert />
                </FormRow>

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

                    <FormRow :is-horizontal="true">
                        <RetailPriceUpdateInfo
                            :last-updated-date="form.option.retailPrice.lastUpdatedDate"
                            :source-url="form.option.retailPrice.sourceUrl" />
                    </FormRow>
                </div>

                <FormRow :is-horizontal="true">
                    <CalculatorShareButton
                        :screenshot-input="screenshotInput"
                        :screenshot-output="resultList"
                        :form="form"
                        :calculator-title="page.calculatorTitle"
                        :preset-title="page.preset.title"
                        :preset-option-title="form.option.title" />
                </FormRow>
            </template>
        </CalculatorInnerContainer>

        <v-divider class="my-16" />

        <InnerContainer>
            <Heading2 class="mb-4">
                Diğer oyun konsolları
            </Heading2>
            <CalculatorPresets :presets="ui.presets" />
        </InnerContainer>

        <div class="mt-16">
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner468x60 :order="1" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner320x50 :order="1" />
            </template>

            <AdsterraNative
                :order="2"
                class="mt-8" />
        </div>
    </div>
</template>

<script>
import page, { presets } from "@/data/pages/konsol-vergisi-hesaplayici/konsol-vergisi-hesaplayici-slug.page.js";
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
        slug: null,
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
                price: vm.form.price * vm.selectedCurrency.rate
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
            return buildResultList(vm.results);
        },
        screenshotInput() {
            const vm = this;
            return buildScreenshotInput({
                price: vm.form.price,
                currency: vm.form.currency
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
            ...presetPage.preset.options[0].form
        };

        const otherPresets = presets.filter(preset => preset.slug !== slug);

        return {
            slug,
            page: presetPage,
            ui: {
                options,
                presets: otherPresets
            },
            form
        };
    }
};
</script>
