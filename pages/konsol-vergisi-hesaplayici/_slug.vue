<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <Heading1>
            {{ page.title }}
        </Heading1>

        <CalculatorInnerContainer>
            <template v-if="slug === 'steam-deck'">
                <vh-alert
                    type="info"
                    class="mb-10">
                    Bu ürünün hangi ürün kategorisinden vergilendirildiğini henüz bilmiyoruz. Bu sayfa sadece bilgi
                    vermek amacıyla hazırlanmıştır.
                </vh-alert>
            </template>

            <FormRow
                class="mb-10"
                label="Model">
                <RadioGrid
                    v-model="form.option"
                    :items="ui.options" />
            </FormRow>

            <template v-if="shouldShowResults">
                <FormRow>
                    <estimated-calculation-alert />
                </FormRow>

                <CalculatorResultList
                    :items="resultList"
                    class="mb-4" />

                <FormRow class="mb-10">
                    <affordability-alert :price="results.prices.taxAdded" />
                </FormRow>

                <div
                    v-if="form.option.retailPrice"
                    class="mb-10">
                    <CalculatorResultFormRow
                        :value="moneyFormat(form.option.retailPrice.value, 'TRY')"
                        class="mb-2"
                        label="Piyasa fiyatı" />

                    <FormRow direction="horizontal">
                        <retail-price-update-info
                            :last-updated-date="form.option.retailPrice.lastUpdatedDate"
                            :source-url="form.option.retailPrice.sourceUrl" />
                    </FormRow>
                </div>

                <FormRow direction="horizontal">
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
            <Heading2>
                Diğer hesaplamalar
            </Heading2>
            <div class="d-flex flex-column gap-12">
                <template v-for="_calculation in ui.calculations">
                    <div :key="_calculation.brand.id">
                        <CalculationPresets
                            :presets="_calculation.presets"
                            :brand="_calculation.brand" />
                    </div>
                </template>
            </div>
        </InnerContainer>
    </div>
</template>

<script>
import page from "@/domain/konsol-vergisi-hesaplayici/preset.page.js";
import { moneyFormat } from "@/utils/formatter.js";
import {
    buildResultList,
    buildScreenshotInput,
    shouldShowResults
} from "@/domain/konsol-vergisi-hesaplayici/utils.js";
import Calculator from "@/domain/konsol-vergisi-hesaplayici/calculator.js";
import { buildCalculations } from "@/domain/konsol-vergisi-hesaplayici/db/_index.js";

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

        const otherCalculations = buildCalculations().filter(calculation => calculation.brand.id === presetPage.preset.brandId);

        return {
            slug,
            page: presetPage,
            ui: {
                options,
                calculations: otherCalculations
            },
            form
        };
    }
};
</script>
